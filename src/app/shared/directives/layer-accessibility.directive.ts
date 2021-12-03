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
import {
  AccessibilityEvent,
  generateUUID,
  AccessibilityEventType,
} from './../typings/internal';
import { LayerAccessibilityMetadata } from './../typings/props';
import { ILayerAccessibilityDirective } from './../typings/structures';

@Directive({
  selector: 'layer-accessibility, [layer-accessibility]',
})
export class LayerAccessibilityDirective
  implements ILayerAccessibilityDirective, OnInit, OnDestroy
{
  @Output('onLayerEvent') eventEmitter = new EventEmitter<AccessibilityEvent>();
  @Input('layer-config') config: LayerAccessibilityMetadata;
  private accessibilityService: AccessibilityService;
  public renderer: Renderer2;
  //move to services

  constructor(public element: ElementRef, ngInjector: Injector) {
    this.accessibilityService = ngInjector.get(AccessibilityService);
    this.renderer = ngInjector.get(Renderer2);
  }
  ngOnInit(): void {
    if (!this.config.layerId) this.config.layerId = generateUUID();
    (this.element.nativeElement as HTMLElement).setAttribute(
      'layer-acc-tag',
      `layer-acc-${this.config.layerId}`
    );
    if (this.accessibilityService.isPopupLayer()) {
      (this.element.nativeElement as HTMLElement).addEventListener(
        'keydown',
        this.keyDownHandler
      );
    }
    this.accessibilityService.registerLayer({
      layerId: this.config.layerId,
      layerDirective: this,
    });
  }

  ngOnDestroy(): void {
    (this.element.nativeElement as HTMLElement).removeEventListener(
      'keydown',
      this.keyDownHandler
    );
    this.accessibilityService.deregisterLayer({ layerId: this.config.layerId });
  }

  private keyDownHandler = (payload: KeyboardEvent) => {
    if (payload.key === 'Escape') {
      this.eventEmitter.emit({
        type: AccessibilityEventType.KeyboardShortcutEvent,
        payload,
      });
      return;
    }
    if (payload.key !== 'Tab') return;
    const layerStructure = this.accessibilityService.getLayerStructure({
      layerId: this.config.layerId,
    });
    if (layerStructure.firstFocusableElement === undefined) return;
    if (payload.shiftKey) {
      if (
        this.getClosestTabbale(document.activeElement as HTMLElement) ===
        layerStructure.firstFocusableElement
      ) {
        layerStructure.lastFocusableElement.focus();
        payload.preventDefault();
      }
    } else if (
      this.getClosestTabbale(document.activeElement as HTMLElement) ===
      layerStructure.lastFocusableElement
    ) {
      layerStructure.firstFocusableElement.focus();
      payload.preventDefault();
    }
  };

  private getClosestTabbale(el: HTMLElement) {
    return el.closest("[tabbable-acc-tag^='tabbable-acc-']");
  }
}
