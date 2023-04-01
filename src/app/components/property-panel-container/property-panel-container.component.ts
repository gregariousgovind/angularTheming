import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Property Panel</h1>
    <ul>
      <app-property-panel [data]="data"></app-property-panel>
    </ul>
    <button type="button" (click)="onSubmit()">Save</button>
    <hr>
    <pre>{{ updatedData | json }}</pre>
  `,
  styles: [
    `
    ul {
      list-style: none;
      padding-left: 10px;
    }
    
    ul:before {
      content: "{"
    }
  
    ul:after {
      content: "}"
    }
  `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyPanelContainerComponent {
  data = {
    name: {
      fname: 'Govind',
      lname: {
        m: 'Singh',
        l: 'Chauhan',
      },
    },
    age: 25,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    hobbies: ['reading', 'swimming', 'gardening'],
    active: true,
  };

  updatedData: any;

  onSubmit() {
    this.updatedData = this.data;
  }
}
