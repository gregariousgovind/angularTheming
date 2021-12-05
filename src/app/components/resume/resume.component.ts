import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IButton } from '../button/button.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  public backButton: IButton = {
    title: 'Back',
    tooltip: 'Home',
    isSmall: true,
    icon: {
      class: 'fa fa-home',
      alignedRight: false,
    },
    tooltipPosition: 'top',
  };

  constructor(private router: Router) {}

  buttonClick(event) {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {}
}
