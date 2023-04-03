import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  data = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    skills: ['HTML', 'CSS', 'JS'],
    contact: {
      email: 'john.doe@example.com',
      phone: '555-1234',
    },
    preferences: {},
  };

  onSubmit(updatedData: any) {
    console.log(updatedData);
  }
}
