import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-panel2',
  templateUrl: './property-panel.component.html',
})
export class PropertyPanelComponent2 {
  @Input() data: any;
  @Output() submit = new EventEmitter<any>();

  get keys() {
    return Object.keys(this.data);
  }

  isObject(value: any) {
    return typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  getDataType(value: any) {
    if (typeof value === 'number') {
      return 'number';
    } else if (typeof value === 'boolean') {
      return 'checkbox';
    } else {
      return 'text';
    }
  }

  onSubmit(value) {
    console.log(value);
  }
}
