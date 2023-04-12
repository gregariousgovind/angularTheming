import { Component, OnInit, ElementRef } from '@angular/core';
import { icon } from './icon';
interface ComponentItem {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent implements OnInit {
  components: ComponentItem[] = [
    {
      name: 'Button',
      icon: 'icon_button',
    },
    {
      name: 'Notification / Toast',
      icon: 'icon_notification',
    },
    {
      name: 'Global loader',
      icon: 'icon_global-loader',
    },
    {
      name: 'Input Select',
      icon: 'icon_input-select',
    },
  ];

  selectedComponent: string;
  isCollapsed = false;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    if (typeof icon != 'undefined') {
      this._elementRef.nativeElement.insertAdjacentHTML('beforeend', icon);
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  select(componentName: string) {
    this.selectedComponent = componentName;
  }
}
