import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.scss'],
})
export class PropertyPanelComponent {
  @Input() data: any;

  getType(value: any) {
    if (Array.isArray(value)) {
      return 'array';
    } else if (typeof value === 'object' && value !== null) {
      return 'object';
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else {
      return 'text';
    }
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getLabel(label) {
    return label.replace(/\$/g, '');
  }
}
