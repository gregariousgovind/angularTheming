import {
  Directive,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { AccessibilityService } from './../services/accessibility.service';
import { AccessibilityEvent, generateUUID } from './../typings/internal';
import { TabbableAccessibilityMetadata } from './../typings/props';
import { ITabbableAccessibilityDirective } from './../typings/structures';

//for children tabbing
@Directive({
  selector: 'tabbable-accessibility, [tabbable-accessibility]',
})
export class TabbableAccessibilityDirective
  implements ITabbableAccessibilityDirective, OnInit, OnDestroy
{
  @Output('onTabbableEvent') eventEmitter =
    new EventEmitter<AccessibilityEvent>();
  public renderer: Renderer2;

  private _config;
  @Input('tabbable-config')
  public get config() {
    return this._config;
  }
  public set config(config: TabbableAccessibilityMetadata) {
    this._config = config;
    this.inIt();
  }

  private accessibilityService: AccessibilityService;
  constructor(public element: ElementRef, ngInjector: Injector) {
    this.accessibilityService = ngInjector.get(AccessibilityService);
    this.renderer = ngInjector.get(Renderer2);
  }

  isArrowNavigationEnabled() {
    return this.accessibilityService.getBlockById({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
    }).config.enableArrowNavigation;
  }

  assignTag(disabled: boolean) {
    (this.element.nativeElement as HTMLElement).setAttribute(
      `tabbable-acc-tag${disabled ? '-disabled' : ''}`,
      `tabbable-acc-${this.config.tabbableId}`
    );
    (this.element.nativeElement as HTMLElement).removeAttribute(
      `tabbable-acc-tag${disabled ? '' : '-disabled'}`
    );
  }

  ngOnInit(): void {
    this.inIt();
    this.config.blockId &&
      this.accessibilityService.registerTabbable({
        layerId: this.config.layerId,
        blockId: this.config.blockId,
        tabbableId: this.config.tabbableId,
        tabbableDirective: this,
      });
  }

  inIt(): void {
    if (!this.config.tabbableId) this.config.tabbableId = generateUUID();
    this.config.blockId = this.accessibilityService.getBlockIdForTabbable({
      tabbableElement: this.element.nativeElement,
    });
    if (this.config.blockId) {
      this.config.layerId = this.accessibilityService.getParentLayerId({
        childElement: this.element.nativeElement,
      });
      this.assignTag(this.config.disabled);
      (this.element.nativeElement as HTMLElement).setAttribute(
        'tabbable-acc-block-id',
        `${this.config.blockId}`
      );
      if (!this.isArrowNavigationEnabled()) {
        (this.element.nativeElement as HTMLElement).setAttribute(
          'tabindex',
          this.config.disabled ? '-1' : '0'
        );
      } else {
        (this.element.nativeElement as HTMLElement).setAttribute(
          'tabindex',
          '-1'
        );
      }
    } else {
      console.warn('could not find closeset element for ', this.config);
    }
  }

  ngOnDestroy() {
    this.config.blockId &&
      this.accessibilityService.deregisterTabbable({
        layerId: this.config.layerId,
        blockId: this.config.blockId,
        tabbableId: this.config.tabbableId,
      });
  }
}
