import {
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AccessibilityService } from './../services/accessibility.service';
import { SkipBlockAccessibilityMetadata } from './../typings/props';

@Directive({
  selector: 'skip-block, [skip-block]',
})
export class SkipBlockAccessibilityDirective implements OnInit, OnDestroy {
  @Input('skip-block-config') config: SkipBlockAccessibilityMetadata;
  private accessibilityService: AccessibilityService;
  private nextTitle: string;
  private blockId: string;
  private layerId: string;
  private cssClass: string;
  private isClicked: boolean;
  constructor(public element: ElementRef, ngInjector: Injector) {
    this.accessibilityService = ngInjector.get(AccessibilityService);
  }
  private skipBlock: HTMLElement;
  private clickHandler = (e: KeyboardEvent | MouseEvent) => {
    if (e instanceof KeyboardEvent) {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!this.config.skipToMain) this.skipToNextBlock();
        else this.skipToMain();
        e.preventDefault();
      }
    } else if (e instanceof MouseEvent) {
      if (e.type === 'click') {
        if (!this.config.skipToMain) this.skipToNextBlock();
        else this.skipToMain();
        e.preventDefault();
      }
    }
  };

  private focusHandler = (e: FocusEvent) => {
    if (!this.isClicked) {
      if (!this.blockId) {
        this.blockId = (this.element.nativeElement as HTMLElement)
          .getAttribute('block-acc-tag')
          .substring(10);
        this.layerId = this.accessibilityService.getParentLayerId({
          childElement: this.element.nativeElement,
        });
      }
      this.nextTitle = this.accessibilityService.getNextBlockTitle(
        this.layerId,
        this.blockId
      );
      if (this.nextTitle) {
        this.skipBlock.innerHTML = `<a role='link' ${
          this.cssClass ? 'class=' : 'style='
        }"${
          this.cssClass ||
          'z-index: 2000; font-size: small; border-radius: 0 0 5px 0; top:2px; left:2px ;background: #2867aa; color:white; padding: 0 8px; width: fit-content; line-height: 40px; position: absolute; cursor:pointer; text-decoration:underline;'
        }">${
          'SKIPTO' +
          ' ' +
          (this.config.skipToMain ? 'MAIN CONTENT' : this.nextTitle)
        }</a>`;
        (this.element.nativeElement as HTMLElement).prepend(this.skipBlock);
        this.skipBlock.focus();
        e.preventDefault();
      } else {
        const tabSeq = this.accessibilityService.getFocusableTabbableSequence({
          layerId: this.layerId,
          blockId: this.blockId,
        });
        if (tabSeq.length) {
          this.accessibilityService
            .getTabbableDirective({
              layerId: this.layerId,
              blockId: this.blockId,
              tabbableId: tabSeq[0],
            })
            .element.nativeElement.focus();
        }
      }
      (this.element.nativeElement as HTMLElement).setAttribute(
        'tabindex',
        '-1'
      );
    }
    this.isClicked = false;
  };

  private blurHandler = (e: FocusEvent) => {
    this.skipBlock.remove();
    e.preventDefault();
    (this.element.nativeElement as HTMLElement).setAttribute('tabindex', '0');
  };

  private skipToNextBlock() {
    const blockId = (this.element.nativeElement as HTMLElement)
      .getAttribute('block-acc-tag')
      .substring(10);
    const layerId = this.accessibilityService.getParentLayerId({
      childElement: this.element.nativeElement,
    });
    this.accessibilityService.skipToNextBlock(layerId, blockId);
  }

  private skipToMain() {
    const main = document.querySelector('[role="main"]');
    if (!main) throw Error('Main role not found in page');
    const firstTabInMain = main.querySelector(
      "[tabbable-acc-tag^='tabbable-acc-']"
    );
    firstTabInMain && (firstTabInMain as HTMLElement).focus();
  }

  clicked = (e) => {
    this.isClicked = true;
  };

  ngOnInit() {
    (this.element.nativeElement as HTMLElement).addEventListener(
      'mousedown',
      this.clicked
    );
    (this.element.nativeElement as HTMLElement).addEventListener(
      'focus',
      this.focusHandler
    );
    (this.element.nativeElement as HTMLElement).setAttribute('tabindex', '0');
    this.skipBlock = document.createElement('div');
    this.skipBlock.setAttribute('tabindex', '0');
    (this.skipBlock as HTMLElement).addEventListener(
      'click',
      this.clickHandler
    );
    (this.skipBlock as HTMLElement).addEventListener(
      'keydown',
      this.clickHandler
    );
    (this.skipBlock as HTMLElement).addEventListener('blur', this.blurHandler);
  }
  ngOnDestroy() {
    (this.skipBlock as HTMLElement).removeEventListener(
      'click',
      this.clickHandler
    );
    (this.skipBlock as HTMLElement).removeEventListener(
      'keydown',
      this.clickHandler
    );
    (this.skipBlock as HTMLElement).removeEventListener(
      'blur',
      this.blurHandler
    );
    (this.element.nativeElement as HTMLElement).removeEventListener(
      'focus',
      this.focusHandler
    );
    (this.element.nativeElement as HTMLElement).removeEventListener(
      'mousedown',
      this.clicked
    );
  }
}
