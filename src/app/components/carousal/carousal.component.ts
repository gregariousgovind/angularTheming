import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss'],
})
export class CarousalComponent implements OnInit {
  private content;
  private cardWidth = 250; // Should be same as --cardWidth;
  private scrollStep;

  constructor() {}

  ngOnInit() {
    this.scrollStep = this.cardWidth + 30;
    this.content = document.getElementById('cardWrapperId');
  }

  scrollLeft(e) {
    e.preventDefault();
    let sl = this.content.scrollLeft;

    if (sl - this.scrollStep <= 0) {
      this.content.scrollTo({ left: 0, behaviour: 'smooth' });
    } else {
      this.content.scrollTo({
        left: sl - this.scrollStep,
        behaviour: 'smooth',
      });
    }
  }

  scrollRight(e) {
    e.preventDefault();
    let sl = this.content.scrollLeft,
      cw = this.content.scrollWidth;

    if (sl + this.scrollStep >= cw) {
      this.content.scrollTo({ left: cw, behaviour: 'smooth' });
    } else {
      this.content.scrollTo({
        left: sl + this.scrollStep,
        behaviour: 'smooth',
      });
    }
  }
}
