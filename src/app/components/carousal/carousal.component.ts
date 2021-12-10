import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss'],
})
export class CarousalComponent implements OnInit {
  private content;
  constructor(private element: ElementRef, private router: Router) {}

  cardsData = [
    {
      id: 1,
      title: 'Angular',
      description: 'WCAG directives implementation with responsive design.',
      avatarUrl:
        'https://angular.io/assets/images/logos/angular/shield-large.svg',
      suppressMenu: false,
      menuConfig: {
        title: '',
        isSmall: true,
        icon: {
          class: 'fa fa-ellipsis-h',
          alignedRight: false,
        },
        styles: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      handleAction: {
        title: 'View Details',
        secondary: true,
        isSmall: true,
        styles: {
          width: 'calc(100% - 4px)',
          margin: '2px',
          border: 'none',
          'border-top': '1px solid var(--theme-color)',
          'border-radius': 0,
          height: '38px',
        },
      },
      reference: '/theming/statusCards',
    },
    {
      id: 2,
      title: 'Codepen',
      description: 'WCAG directives implementation with responsive design.',
      avatarUrl:
        'https://angular.io/assets/images/logos/angular/shield-large.svg',
      suppressMenu: false,
      menuConfig: {
        title: '',
        isSmall: true,
        icon: {
          class: 'fa fa-ellipsis-h',
          alignedRight: false,
        },
        styles: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      handleAction: {
        title: 'View Details',
        secondary: true,
        isSmall: true,
        styles: {
          width: 'calc(100% - 4px)',
          margin: '2px',
          border: 'none',
          'border-top': '1px solid var(--theme-color)',
          'border-radius': 0,
          height: '38px',
        },
      },
      reference: '/theming/fieldWidget',
    },
    {
      id: 3,
      title: 'React',
      description: 'WCAG directives implementation with responsive design.',
      avatarUrl:
        'https://angular.io/assets/images/logos/angular/shield-large.svg',
      suppressMenu: false,
      menuConfig: {
        title: '',
        isSmall: true,
        icon: {
          class: 'fa fa-ellipsis-h',
          alignedRight: false,
        },
        styles: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      handleAction: {
        title: 'View Details',
        secondary: true,
        isSmall: true,
        styles: {
          width: 'calc(100% - 4px)',
          margin: '2px',
          border: 'none',
          'border-top': '1px solid var(--theme-color)',
          'border-radius': 0,
          height: '38px',
        },
      },
    },
    {
      id: 4,
      title: 'HTML',
      description: 'WCAG directives implementation with responsive design.',
      avatarUrl:
        'https://angular.io/assets/images/logos/angular/shield-large.svg',
      suppressMenu: false,
      menuConfig: {
        title: '',
        isSmall: true,
        icon: {
          class: 'fa fa-ellipsis-h',
          alignedRight: false,
        },
        styles: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      handleAction: {
        title: 'View Details',
        secondary: true,
        isSmall: true,
        styles: {
          width: 'calc(100% - 4px)',
          margin: '2px',
          border: 'none',
          'border-top': '1px solid var(--theme-color)',
          'border-radius': 0,
          height: '38px',
        },
      },
    },
    {
      id: 5,
      title: 'CSS',
      description: 'WCAG directives implementation with responsive design.',
      avatarUrl:
        'https://angular.io/assets/images/logos/angular/shield-large.svg',
      suppressMenu: false,
      menuConfig: {
        title: '',
        isSmall: true,
        icon: {
          class: 'fa fa-ellipsis-h',
          alignedRight: false,
        },
        styles: {
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      handleAction: {
        title: 'View Details',
        secondary: true,
        isSmall: true,
        styles: {
          width: 'calc(100% - 4px)',
          margin: '2px',
          border: 'none',
          'border-top': '1px solid var(--theme-color)',
          'border-radius': 0,
          height: '38px',
        },
      },
    },
  ];

  public isLeftDisabled() {
    return this.content.scrollLeft == 0;
  }

  public isRightDisabled() {
    return (
      Math.abs(
        this.content.scrollLeft +
          this.content.offsetWidth -
          this.content.scrollWidth
      ) < 1
    );
  }

  ngOnInit() {
    this.content = this.element.nativeElement.querySelector('#cardWrapperId');
  }

  handleCardClick(event, card) {
    console.info(event, card);
    card.reference && this.router.navigateByUrl(card.reference);
  }

  scrollLeft(e) {
    e.preventDefault();
    let sl = this.content.scrollLeft,
      sw = this.content.scrollWidth;

    if (sl - sw / 9 <= 0) {
      this.content.scrollTo({ left: 0, behaviour: 'smooth' });
    } else {
      this.content.scrollTo({
        left: sl - sw / 9,
        behaviour: 'smooth',
      });
    }
  }

  scrollRight(e) {
    e.preventDefault();
    let sl = this.content.scrollLeft,
      sw = this.content.scrollWidth;

    if (sl + sw / 9 >= sw) {
      this.content.scrollTo({ left: sw, behaviour: 'smooth' });
    } else {
      this.content.scrollTo({
        left: sl + sw / 9,
        behaviour: 'smooth',
      });
    }
  }
}
