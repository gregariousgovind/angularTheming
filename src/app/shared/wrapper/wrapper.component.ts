import { Component, OnInit } from '@angular/core';
import { IButton } from '../../components/button/button.model';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  footerButton: IButton = {
    title: 'Default',
    tooltip: 'DEFAULT',
    isSmall: true,
    icon: {
      class: 'fa fa-caret-up',
      alignedRight: false,
      isCombobox: true,
      tooltip: 'icon',
      tooltipPosition: 'top',
    },
    tooltipPosition: 'left',
  };

  buttonClick(event) {
    console.log(event);
  }

  constructor() {}

  ngOnInit() {}
}
