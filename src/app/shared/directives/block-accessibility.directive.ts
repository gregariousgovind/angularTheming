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
import { BlockAccessibilityMetadata } from './../typings/props';
import { IBlockAccessibilityDirective } from './../typings/structures';

@Directive({
  selector: 'block-accessibility, [block-accessibility]',
})
export class BlockAccessibilityDirective
  implements IBlockAccessibilityDirective, OnInit, OnDestroy
{
  @Output('onBlockEvents') eventEmitter =
    new EventEmitter<AccessibilityEvent>();
  @Input('block-config') config: BlockAccessibilityMetadata;
  private accessibilityService: AccessibilityService;
  public renderer: Renderer2;
  currentFocussedChildIndex: number;

  constructor(public element: ElementRef, ngInjector: Injector) {
    this.accessibilityService = ngInjector.get(AccessibilityService);
    this.renderer = ngInjector.get(Renderer2);
  }

  ngOnInit(): void {
    if (!this.config.blockId) this.config.blockId = generateUUID();
    if (!this.config.layerId)
      this.config.layerId = this.accessibilityService.getParentLayerId({
        childElement: this.element.nativeElement,
      });
    (this.element.nativeElement as HTMLElement).setAttribute(
      'block-acc-tag',
      `block-acc-${this.config.blockId}`
    );
    (this.element.nativeElement as HTMLElement).setAttribute(
      'block-acc-layer-id',
      `${this.config.layerId}`
    );
    if (this.config.enableArrowNavigation) {
      if (this.config.leftRightNaviagation) {
        (this.element.nativeElement as HTMLElement).addEventListener(
          'keydown',
          this.leftRightArrowNavHandler
        );
      } else {
        (this.element.nativeElement as HTMLElement).addEventListener(
          'keydown',
          this.upDownArrowNavHandler
        );
      }
      (this.element.nativeElement as HTMLElement).addEventListener(
        'focus',
        this.focusHandler
      );
      (this.element.nativeElement as HTMLElement).setAttribute('tabindex', '0');
      (this.element.nativeElement as HTMLElement).addEventListener(
        'focusout',
        this.blurHandler
      );
    }
    this.accessibilityService.registerBlock({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
      blockDirective: this,
    });
  }

  private upDownArrowNavHandler = (e: KeyboardEvent) => {
    if (this.upDownArrowNav[e.key]) {
      this.upDownArrowNav[e.key](e);
    }
  };

  private leftRightArrowNavHandler = (e: KeyboardEvent) => {
    if (this.leftRightArrowNav[e.key]) {
      this.leftRightArrowNav[e.key](e);
    }
  };

  private upDownArrowNav = {
    ArrowUp: (e) => {
      this.goToPrevious(e);
    },
    ArrowDown: (e) => {
      this.goToNext(e);
    },
  };

  private leftRightArrowNav = {
    ArrowLeft: (e) => {
      this.goToPrevious(e);
    },
    ArrowRight: (e) => {
      this.goToNext(e);
    },
  };

  private goToPrevious = (e) => {
    const tabSequence = this.accessibilityService.getFocusableTabbableSequence({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
    });
    if (this.currentFocussedChildIndex === undefined)
      this.currentFocussedChildIndex = 0;
    this.currentFocussedChildIndex === 0
      ? (this.currentFocussedChildIndex = tabSequence.length - 1)
      : this.currentFocussedChildIndex--;
    this.accessibilityService
      .getTabbableDirective({
        layerId: this.config.layerId,
        blockId: this.config.blockId,
        tabbableId: tabSequence[this.currentFocussedChildIndex],
      })
      .element.nativeElement.focus();
    e.preventDefault();
  };

  private goToNext = (e) => {
    const tabSequence = this.accessibilityService.getFocusableTabbableSequence({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
    });
    if (this.currentFocussedChildIndex === undefined)
      this.currentFocussedChildIndex = 0;
    this.currentFocussedChildIndex === tabSequence.length - 1
      ? (this.currentFocussedChildIndex = 0)
      : this.currentFocussedChildIndex++;
    this.accessibilityService
      .getTabbableDirective({
        layerId: this.config.layerId,
        blockId: this.config.blockId,
        tabbableId: tabSequence[this.currentFocussedChildIndex],
      })
      .element.nativeElement.focus();
    e.preventDefault();
  };

  private focusHandler = (e: KeyboardEvent) => {
    (this.element.nativeElement as HTMLElement).setAttribute('tabindex', '-1');
    if (this.currentFocussedChildIndex === undefined)
      this.currentFocussedChildIndex = 0;
    const tabSequence = this.accessibilityService.getFocusableTabbableSequence({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
    });
    this.accessibilityService.getTabbableDirective({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
      tabbableId: tabSequence[this.currentFocussedChildIndex],
    }) &&
      this.accessibilityService
        .getTabbableDirective({
          layerId: this.config.layerId,
          blockId: this.config.blockId,
          tabbableId: tabSequence[this.currentFocussedChildIndex],
        })
        .element.nativeElement.focus();
  };

  private blurHandler = (e: FocusEvent) => {
    if (
      !(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)
    ) {
      (this.element.nativeElement as HTMLElement).setAttribute('tabindex', '0');
      e.preventDefault();
    }
  };

  ngOnDestroy() {
    this.accessibilityService.deregisterBlock({
      layerId: this.config.layerId,
      blockId: this.config.blockId,
    });
    if (this.config.enableArrowNavigation) {
      if (this.config.leftRightNaviagation) {
        (this.element.nativeElement as HTMLElement).removeEventListener(
          'keydown',
          this.leftRightArrowNavHandler
        );
      } else {
        (this.element.nativeElement as HTMLElement).removeEventListener(
          'keydown',
          this.upDownArrowNavHandler
        );
      }
      (this.element.nativeElement as HTMLElement).removeEventListener(
        'focus',
        this.focusHandler
      );
      (this.element.nativeElement as HTMLElement).removeEventListener(
        'blur',
        this.blurHandler
      );
    }
  }
}
