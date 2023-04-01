import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-panel',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <ng-container *ngTemplateOutlet="propertyTemplate; context: { data: data }"></ng-container>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>

    <ng-template #propertyTemplate let-data>
      <div *ngFor="let property of getObjectKeys(data)">
        <div *ngIf="isObject(data[property])">
          <h4>{{ property }}</h4>
          <ng-container *ngTemplateOutlet="propertyTemplate; context: { data: data[property] }"></ng-container>
        </div>
        <div *ngIf="!isObject(data[property])">
          <label [for]="property">{{ property | titlecase }}</label>
          <input
            [type]="getInputType(data[property])"
            [name]="property"
            [id]="property"
            [ngModel]="data[property]"
            #prop="ngModel"
            [required]="isRequired(data[property])"
          />
          <div *ngIf="prop.errors?.required">This field is required</div>
        </div>
      </div>
    </ng-template>
  `,
})
export class PropertyPanelComponent {
  @Input() data: any;
  @Output() submit = new EventEmitter<any>();

  onSubmit() {
    this.submit.emit(this.data);
  }

  isObject(val: any) {
    return typeof val === 'object';
  }

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }

  getInputType(val: any) {
    if (typeof val === 'number') {
      return 'number';
    } else if (typeof val === 'boolean') {
      return 'checkbox';
    } else if (Array.isArray(val)) {
      return 'select';
    } else {
      return 'text';
    }
  }

  isRequired(val: any) {
    return val === '' || val === null || val === undefined;
  }
}
