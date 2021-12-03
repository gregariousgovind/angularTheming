export interface IStatusCards {
  activeCardId: number;
  statusCards: IStatusCard[];
}

export interface IStatusCard {
  id: number;
  label: string;
  value: number;
}
