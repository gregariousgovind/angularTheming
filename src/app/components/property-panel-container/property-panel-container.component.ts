import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PropertyPanelComponent } from '../property-panel/property-panel.component';

@Component({
  selector: 'app-property-panel-container',
  templateUrl: './property-panel-container.component.html',
  styleUrls: ['./property-panel-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyPanelContainerComponent {
  @ViewChild('panel') propertyPanelComponent: PropertyPanelComponent;

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

  showJSON() {
    this.dataShown = !this.dataShown;
  }

  handleSubmit() {
    console.log(this.propertyPanelComponent.getUpdatedConfig(), this.data);
  }
}
