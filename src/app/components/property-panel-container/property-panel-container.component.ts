import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-property-panel-container',
  templateUrl: './property-panel-container.component.html',
  styleUrls: ['./property-panel-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyPanelContainerComponent {
  data = {
    name$: 'Govind Singh Chauhan',
    age: 24,
    address: {
      street: '271',
      city: 'Kanpur',
      state: 'UP',
      zip: '208021',
    },
    phoneNumbers: [
      {
        type: 'home',
        number: '555-1234',
      },
      {
        type: 'work',
        number: '555-5678',
      },
    ],
    hobbies: ['COC', 'CodePen', 'Travelling'],
    $email: 'govind.chauhan@example.com',
    active: true,
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
}
