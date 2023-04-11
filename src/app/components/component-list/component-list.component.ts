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
    {
      name: 'Button',
      icon: 'M6 4h12v4h-4v10H6V8H2V4h4zm4 6v8h8v-8h-2v6h-4v-6h-2z',
    },
    {
      name: 'Notification / Toast',
      icon: 'M19 11h-5V6h-4v5H5v8h14v-8h1v-5zm-7 5h-2v2h2v-2z',
    },
    {
      name: 'Global loader',
      icon: 'M17 16h-2V9h2v7zm-3 0h-2V7h2v9zm-3 0H9V11h2v5zm-3 0H6V5h2v11zm-3 0H3V13h2v3z',
    },
    {
      name: 'Input Select',
      icon: 'M19 11h-5V6h-4v5H5v8h14v-8h1v-5zm-7 5h-2v2h2v-2z',
    },
  ];

  selectedComponent: string;
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  select(componentName: string) {
    this.selectedComponent = componentName;
  }
}
