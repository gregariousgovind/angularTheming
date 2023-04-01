import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Property Panel</h1>
    <app-property-panel [data]="data" (onSubmit)="onSubmit($event)"></app-property-panel>
    <hr>
    <pre>{{ data | json }}</pre>
  `,
})
export class PropertyPanelContainerComponent {
  data = {
    name: 'John Doe',
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

  onSubmit(data: any) {
    this.updatedData = data;
    console.log(this.updatedData);
  }
}
