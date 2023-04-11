import { Component } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent {
  selectedComponentIndex: number = -1;

  selectComponent(index: number) {
    this.selectedComponentIndex = index;
  }
}
