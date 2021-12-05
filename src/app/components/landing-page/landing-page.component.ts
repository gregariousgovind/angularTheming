import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IButton } from '../button/button.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public resumeBtnConfig: IButton;

  constructor(private router: Router) {}

  ngOnInit() {
    this.resumeBtnConfig = {
      title: 'View My Resume',
    };
  }

  viewResume(e) {
    this.router.navigateByUrl('/resume');
  }
}
