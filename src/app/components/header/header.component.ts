import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  private nav;

  public navigationsConfig = {
    activeId: 1,
    navigations: [
      {
        id: 1,
        name: 'Contracts',
        url: '/landing',
      },
      {
        id: 2,
        name: 'Suppliers',
        url: '/landing',
      },
      {
        id: 3,
        name: 'RFx',
        url: '/landing',
      },
    ],
  };

  ngOnInit() {
    this.nav = this.element.nativeElement.querySelector('#headerNavigation');
  }

  handleNavigations(nav) {
    this.navigationsConfig.activeId = nav.id;
    this.router.navigateByUrl(nav.url);
  }

  openMenu() {
    if (this.nav.className === 'header-navigation') {
      this.renderer.addClass(this.nav, 'expanded');
    } else {
      this.renderer.removeClass(this.nav, 'expanded');
    }
  }
}
