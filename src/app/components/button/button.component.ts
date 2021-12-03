import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IButton } from './button.model';

@Component({
  selector: 'demo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() config: IButton;
  @Output() callback: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('btnLeftIconContainer', { read: ViewContainerRef, static: true })
  btnLeftIconContainerRef: ViewContainerRef;
  @ViewChild('btnRightIconContainer', { read: ViewContainerRef, static: true })
  btnRightIconContainerRef: ViewContainerRef;
  @ViewChild('comboboxBTNContainer', { read: ViewContainerRef, static: true })
  comboboxBTNContainerRef: ViewContainerRef;

  @ViewChild('btnIconTemplate', { static: true })
  btnIconTemplateRef: TemplateRef<any>;
  @ViewChild('comboboxBTNTemplate', { static: true })
  comboboxBTNTemplateRef: TemplateRef<any>;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.config && this.config.icon) {
      if (this.config.icon.isCombobox) {
        this.renderer.addClass(
          this.element.nativeElement.querySelector('.btn-container'),
          'combobox'
        );
        this.comboboxBTNContainerRef.createEmbeddedView(
          this.comboboxBTNTemplateRef
        );
      } else {
        this.config.icon.alignedRight
          ? this.btnRightIconContainerRef.createEmbeddedView(
              this.btnIconTemplateRef
            )
          : this.btnLeftIconContainerRef.createEmbeddedView(
              this.btnIconTemplateRef
            );
      }
    }
  }

  onClickHandle(event, isCombobox?): void {
    event.preventDefault();
    if (!this.config.disabled) {
      this.callback.emit({
        event: event,
        comboboxEvent: isCombobox ? true : false,
        callbackParams: this.config.callbackParams,
      });
    }
  }
}
