import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-panel',
  template: `
    <ul>
      <ng-container *ngFor="let item of objectKeys(data)">
        <li>
          <label [attr.for]="item">{{ item }}</label>
          <ng-container [ngSwitch]="getType(data[item])">
            <ng-container *ngSwitchCase="'object'">
              <ul>
                <app-property-panel
                  *ngIf="data[item]"
                  [data]="data[item]">
                </app-property-panel>
              </ul>
            </ng-container>
            <ng-container *ngSwitchCase="'array'">
              <select id="{{ item }}" name="{{ item }}" [(ngModel)]="data[item]">
                <option *ngFor="let option of data[item]" [value]="option">{{ option }}</option>
              </select>
            </ng-container>
            <ng-container *ngSwitchCase="'boolean'">
              <input type="checkbox" id="{{ item }}" name="{{ item }}" [(ngModel)]="data[item]">
            </ng-container>
            <ng-container *ngSwitchDefault>
              <input type="{{ getType(data[item]) }}" id="{{ item }}" name="{{ item }}" [(ngModel)]="data[item]">
            </ng-container>
          </ng-container>
        </li>
      </ng-container>
    </ul>
  `,
})
export class PropertyPanelComponent {
  @Input() data: any;

  getType(value: any) {
    if (Array.isArray(value)) {
      return 'array';
    } else if (typeof value === 'object' && value !== null) {
      return 'object';
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else {
      return 'text';
    }
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
