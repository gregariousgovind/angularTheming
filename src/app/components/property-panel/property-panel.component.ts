import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.scss'],
})
export class PropertyPanelComponent implements OnInit {
  @Input() data: any;
  config: any;

  ngOnInit() {
    this.config = JSON.parse(JSON.stringify(this.data));
    this.removeDollarSigns(this.config);
  }

  removeDollarSigns(obj) {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const newKey = key.replace(/\$/g, '');
        if (newKey !== key) {
          obj[newKey] = obj[key];
          delete obj[key];
        }
        this.removeDollarSigns(obj[newKey]);
      });
    }
    return obj;
  }

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

  getUpdatedConfig() {
    return this.config;
  }

  getLabel(label) {
    return label.replace(/\$/g, '');
  }
}
