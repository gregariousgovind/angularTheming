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
      <ng-container *ngIf="updatedData">
        <hr>
        <pre>{{ updatedData | json }}</pre>
      </ng-container>
    </div>
  `,
  styleUrls: ['./property-panel-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyPanelContainerComponent {
  data = {
    name: 'Govind Singh Chauhan',
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
    email: 'govind.chauhan@example.com',
    active: true,
  };

  updatedData: any;

  onSubmit() {
    this.updatedData = this.data;
  }
}
