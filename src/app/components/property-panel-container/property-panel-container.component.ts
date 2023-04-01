import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Property Panel</h1>
      <app-property-panel [data]="formData" (submit)="onSubmit($event)"></app-property-panel>
    </div>
  `,
  styles: [
    `
      .container {
        width: 60%;
        margin: 0 auto;
        margin-top: 50px;
      }
    `,
  ],
})
export class PropertyPanelContainerComponent {
  formData = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    hobbies: ['reading', 'painting', 'traveling'],
  };

  onSubmit(data: any) {
    console.log(data);
  }
}
