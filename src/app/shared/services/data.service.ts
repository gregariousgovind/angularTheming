import { Injectable } from '@angular/core';
import { IStatusCards } from '../../shared/interfaces/status-cards.model';

@Injectable()
export class DataService {
  cardsData: IStatusCards = {
    activeCardId: 1,
    statusCards: [
      {
        id: 1,
        label: 'all',
        value: 115,
      },
      {
        id: 2,
        label: 'draft',
        value: 10,
      },
      {
        id: 3,
        label: 'in progress',
        value: 15,
      },
      {
        id: 4,
        label: 'review pending',
        value: 20,
      },
      {
        id: 5,
        label: 'review done',
        value: 20,
      },
      {
        id: 6,
        label: 'in progress - validated & review required',
        value: 10,
      },
      {
        id: 7,
        label: 'in progress - validation pending',
        value: 10,
      },
      {
        id: 8,
        label: 'external review pending',
        value: 10,
      },
      {
        id: 9,
        label: 'closed',
        value: 10,
      },
      {
        id: 10,
        label: 'rejected',
        value: 10,
      },
    ],
  };

  constructor() {}
}
