import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'property-panel',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ul *ngIf="!collapsed">
        <li *ngFor="let key of keys">
          <label [attr.for]="key">{{ key }}</label>
          <ng-container [ngSwitch]="getTypeof(obj[key])">
            <ng-container *ngSwitchCase="'string'">
              <input type="text" [formControlName]="key" [ngClass]="inputClasses" [id]="key">
            </ng-container>
            <ng-container *ngSwitchCase="'number'">
              <input type="number" [formControlName]="key" [ngClass]="inputClasses" [id]="key">
            </ng-container>
            <ng-container *ngSwitchCase="'boolean'">
              <input type="checkbox" [formControlName]="key" [ngClass]="inputClasses" [id]="key">
            </ng-container>
            <ng-container *ngSwitchCase="'object'">
              <ng-container *ngIf="isArray(obj[key])">
                <select [formControlName]="key" [ngClass]="inputClasses" [id]="key">
                  <option *ngFor="let item of obj[key]" [value]="item">{{ item }}</option>
                </select>
              </ng-container>
              <ng-container *ngIf="!isArray(obj[key])">
                <li>
                  <input type="checkbox" [(ngModel)]="expanded" [id]="'toggle-' + key" [name]="'toggle-' + key" class="toggle-input">
                  <label [for]="'toggle-' + key" class="toggle-label">{{ key }}</label>
                  <ul *ngIf="expanded">
                    <li>
                      <property-panel [obj]="obj[key] || {}" [form]="form.get(key)" [inputClasses]="inputClasses"></property-panel>
                    </li>
                  </ul>
                </li>
              </ng-container>
            </ng-container>
            <ng-container *ngSwitchDefault>
              <input type="text" [formControlName]="key" [ngClass]="inputClasses" [id]="key">
            </ng-container>
          </ng-container>
        </li>
      </ul>
      <div *ngIf="keys.length === 0">No inputs to display</div>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: [
    `
    .toggle-label {
      cursor: pointer;
    }
    .toggle-input {
      display: none;
    }
    .toggle-input:checked ~ ul {
      display: block;
    }
  `,
  ],
})
export class PropertyPanelComponent {
  @Input() obj: object = {};
  @Input() inputClasses: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  expanded = true;
  collapsed = false;

  get keys(): string[] {
    return Object.keys(this.obj);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.keys.forEach((key) => {
      let value = this.obj[key];
      let control = null;

      if (typeof value === 'string') {
        control = this.fb.control(key, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z]+$/),
        ]);
      } else if (typeof value === 'number') {
        control = this.fb.control(key, [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ]);
      } else if (typeof value === 'boolean') {
        control = this.fb.control(key);
      } else if (Array.isArray(value)) {
        control = this.fb.control(key);
      } else if (typeof value === 'object') {
        control = this.fb.group({});
        Object.keys(value).forEach((k) => {
          control.addControl(k, this.fb.control(value[k]));
        });
      } else {
        control = this.fb.control(key);
      }

      this.form.addControl(key, control);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  getTypeof(value) {
    return typeof value;
  }
}
