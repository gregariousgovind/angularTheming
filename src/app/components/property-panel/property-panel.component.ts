import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.css']
})
export class PropertyPanelComponent {
  @Input() data: any;
  @Output() updated = new EventEmitter<any>();

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = this.createForm(this.data);
  }

  onSubmit() {
    this.updated.emit(this.form.value);
  }

  createForm(data: any): FormGroup {
    const formGroup = new FormGroup({});

    for (const key of Object.keys(data)) {
      const value = data[key];
      let formControl: FormControl;

      switch (this.getType(value)) {
        case 'string':
          formControl = new FormControl(value);
          break;
        case 'number':
          formControl = new FormControl(value);
          break;
        case 'boolean':
          formControl = new FormControl(value);
          break;
        case 'object':
          formControl = new FormControl(this.createForm(value));
          break;
        case 'array':
          formControl = new FormControl(value);
          break;
      }

      formGroup.addControl(key, formControl);
    }

    return formGroup;
  }

  getType(val: any): string {
    if (typeof val === 'string') {
      return 'string';
    } else if (typeof val === 'number') {
      return 'number';
    } else if (typeof val === 'boolean') {
      return 'boolean';
    } else if (Array.isArray(val)) {
      return 'array';
    } else {
      return 'object';
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  toggleExpand(key: string) {
    this.isExpandedMap[key] = !this.isExpandedMap[key];
  }

  isExpanded(key: string): boolean {
    return this.isExpandedMap[key];
  }

  getOptions(arr: any[]): string[] {
    if (arr.length === 0) {
      return [];
    } else if (typeof arr[0] === 'string') {
      return arr;
    } else {
      return Object.keys(arr[0]);
    }
  }

  isObject(val: any): boolean {
    return typeof val === 'object';
  }

  isPrimitive(val: any): boolean {
    return !this.isObject(val) && !Array.isArray(val);
  }

  isFormControl(val: any): boolean {
    return val instanceof FormControl;
  }

  isFormGroup(val: any): boolean {
    return val instanceof FormGroup;
  }

  isFormArray(val: any): boolean {
    return val instanceof FormArray;
  }

  isExpandedMap: { [key: string]: boolean } = {};
}
