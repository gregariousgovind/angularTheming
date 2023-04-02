import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-property-panel-container',
  templateUrl: './property-panel-container.component.html',
  styleUrls: ['./property-panel-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyPanelContainerComponent {
  data = {
    text: 'test button',
    backgroundColor: '#007bff',
    textColor: '#ffffff',
    icon: { name: 'star' },
    disabled: false,
    onClick: 'clickEvent',
  };

  dataShown: boolean = false;
  isObjectView: boolean = false;
  updatedData: any;

  showJSON() {
    this.dataShown = !this.dataShown;
    this.dataShown && this.handleSubmit();
  }

  handleSubmit() {
    this.updatedData = JSON.parse(JSON.stringify(this.data));
    this.removeDollarSigns(this.updatedData);
    this.removeEmpty(this.updatedData);
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

  removeEmpty(obj) {
    const isEmpty = (value) =>
      value === '' || value === null || value === undefined;

    const isArray = (value) => Array.isArray(value);

    const isObject = (value) => typeof value === 'object';

    const removeEmptyArrayElements = (arr) =>
      arr.filter(
        (value) =>
          !isEmpty(value) &&
          (isObject(value)
            ? Object.keys(this.removeEmpty(value)).length !== 0
            : true)
      );

    const removeEmptyObjectProperties = (obj) =>
      Object.keys(obj).forEach((key) =>
        isEmpty(obj[key])
          ? delete obj[key]
          : isArray(obj[key])
          ? (obj[key] = removeEmptyArrayElements(obj[key]))
          : isObject(obj[key])
          ? (removeEmptyObjectProperties(obj[key]),
            Object.keys(obj[key]).length === 0 && delete obj[key])
          : null
      );

    isArray(obj)
      ? (obj = removeEmptyArrayElements(obj))
      : isObject(obj)
      ? removeEmptyObjectProperties(obj)
      : null;

    return obj;
  }
}
