import { Component } from '@angular/core';

interface ComponentItem {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent {
  components: ComponentItem[] = [
    { name: 'Component 1', icon: 'M16 18.2V5.8L7.6 12z' },
    { name: 'Component 2', icon: 'M4 4h16v4H4zm0 6h16v4H4zm0 6h16v4H4z' },
    { name: 'Component 3', icon: 'M16 18.2V5.8L7.6 12z' },
    { name: 'Component 4', icon: 'M4 4h16v4H4zm0 6h16v4H4zm0 6h16v4H4z' },
    { name: 'Component 5', icon: 'M16 18.2V5.8L7.6 12z' },
    { name: 'Component 6', icon: 'M4 4h16v4H4zm0 6h16v4H4zm0 6h16v4H4z' },
  ];

  selectedComponent: ComponentItem = null;
  isCollapsed = true;

  selectComponent(component: ComponentItem) {
    this.selectedComponent = component;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
