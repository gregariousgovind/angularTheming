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
      name: 'All',
    },
    {
      id: 2,
      name: 'Draft',
    },
    {
      id: 3,
      name: 'In Progress',
    },
    {
      id: 4,
      name: 'In Progress - Validation Pending',
    },
    {
      id: 5,
      name: 'Closed',
    },
  ];

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
