import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-property-panel-container',
  template: `
    <div class="property-panel-container">
      <h1>Property Panel</h1>
      <ul [attr.data-name]="'config: '">
        <app-property-panel [data]="data"></app-property-panel>
      </ul>
      <button type="button" (click)="onSubmit()">Save</button>
      <hr>
    </div>
    <pre>{{ updatedData | json }}</pre>
  `,
  styleUrls: ['./property-panel-container.component.scss'],
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
