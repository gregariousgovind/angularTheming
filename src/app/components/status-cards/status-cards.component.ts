import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  IStatusCard,
  IStatusCards,
} from '../../shared/interfaces/status-cards.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.scss'],
  providers: [DataService],
})
export class StatusCardsComponent implements OnInit {
  private content;
  public cardsData: IStatusCards;
  public cards: IStatusCard[];
  private scrollStep: number = 120;
  public scrollAnnouncement: string = '';

  constructor(private element: ElementRef, private data: DataService) {}

  ngOnInit(): void {
    this.cardsData = this.data.cardsData;
    this.cards = this.cardsData.statusCards;
    this.content = this.element.nativeElement.querySelector('#cardsWrapperId');
  }

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

  leftScroll(e) {
    e.preventDefault();
    if (this.content.scrollLeft - this.scrollStep <= 0) {
      this.content.scrollTo({
        left: 0,
        behaviour: 'smooth',
      });
      this.scrollAnnouncement = 'Reached left scroll limit.';
    } else {
      this.content.scrollTo({
        left: this.content.scrollLeft - this.scrollStep,
        behavior: 'smooth',
      });
      this.scrollAnnouncement = `Scrolled to ${Math.round(
        this.content.scrollLeft - this.scrollStep
      )} left.`;
    }
  }

  rightScroll(e) {
    e.preventDefault();
    if (
      this.content.scrollLeft + this.content.offsetWidth + this.scrollStep >
      this.content.scrollWidth
    ) {
      this.content.scrollTo({
        left: this.content.scrollWidth,
        behavior: 'smooth',
      });
      this.scrollAnnouncement = 'Reached right scroll limit.';
    } else {
      this.content.scrollTo({
        left: this.content.scrollLeft + this.scrollStep,
        behavior: 'smooth',
      });
      this.scrollAnnouncement = `Scrolled to ${Math.round(
        this.content.scrollLeft + this.scrollStep
      )} right.`;
    }
  }

  changeSelection(id) {
    this.cardsData.activeCardId = id;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
