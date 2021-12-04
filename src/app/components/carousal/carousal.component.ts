import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss'],
})
export class CarousalComponent implements OnInit {
  private content;
  constructor(private element: ElementRef) {}

  cardsData = [
    {
      id: 1,
      name: 'Angular',
    },
    {
      id: 2,
      name: 'React',
    },
    {
      id: 3,
      name: 'JavaScript',
    },
    {
      id: 4,
      name: 'HTML',
    },
    {
      id: 5,
      name: 'CSS',
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
