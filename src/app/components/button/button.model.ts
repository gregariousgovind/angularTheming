export interface IIcon {
  class: string;
  isCombobox?: boolean;
  alignedRight: boolean;
  tooltip: string;
  tooltipPosition: string;
}

export class IButton {
  title: string = '';
  disabled?: boolean = false;
  secondary?: boolean = false;
  tertiary?: boolean = false;
  isSmall?: boolean = false;
  isLarge?: boolean = false;
  callbackParams?: any = {};
  styles?: any = {};
  icon?: IIcon;
  tooltip?: string = '';
  tooltipPosition?: string;
}
