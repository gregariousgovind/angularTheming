import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { IButton } from '../button/button.model';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
})
export class ThemingComponent implements OnInit {
  public themeColor: '#32588d';

  public themes: any[] = [
    {
      themeName: 'DEFAULT',
      color: '#32588d',
    },
    {
      themeName: 'GREENLAND',
      color: '#367c2b',
    },
    {
      themeName: 'SERCO',
      color: '#474b4f',
    },
    {
      themeName: 'AMERICAN HEART',
      color: '#c10e21',
    },
    {
      themeName: 'BLUE SEA',
      color: '#0460CD',
    },
    {
      themeName: 'AUDACIOUS',
      color: '#fccd04',
    },
    {
      themeName: 'FUTURISTIC',
      color: '#14a76c',
    },
    {
      themeName: 'VIVID',
      color: '#44318d',
    },
    {
      themeName: 'TERMINALOGY',
      color: '#2e9cca',
    },
    {
      themeName: 'MODERN',
      color: '#3aafa9',
    },
    {
      themeName: 'REACTIVE',
      color: '#86c232',
    },
    {
      themeName: 'GRAYISH',
      color: '#6b6e70',
    },
    {
      themeName: 'BROWNISH',
      color: '#bc4639',
    },
    {
      themeName: 'GORGEOUS',
      color: '#687864',
    },
    {
      themeName: 'STRIKING',
      color: '#aaa71e',
    },
    {
      themeName: 'CITRUS',
      color: '#d6ce15',
    },
    {
      themeName: 'VIVID BLUES',
      color: '#0074e1',
    },
    {
      themeName: 'ORANGE',
      color: '#f79e02',
    },
    {
      themeName: 'UNIQUE',
      color: '#15db95',
    },
    {
      themeName: 'SNOWY SKY',
      color: '#3b8beb',
    },
    {
      themeName: 'PEACEFUL',
      color: '#474853',
    },
    {
      themeName: 'GREYISH',
      color: '#5f6366',
    },
    {
      themeName: 'SLEEK',
      color: '#cb2d6f',
    },
    {
      themeName: 'PURPLE',
      color: '#8a3ab9',
    },
  ];

  themeButton: IButton = {
    title: '',
    icon: {
      class: 'fa-caret-up',
      alignedRight: false,
      tooltip: 'icon',
      tooltipPosition: 'top',
    },
    tooltipPosition: 'left',
  };

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  setTheme(H) {
    let r: any = 0,
      g: any = 0,
      b: any = 0;
    if (H.length == 4) {
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h: any = 0,
      s: any = 0,
      l: any = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    this.renderer.setStyle(
      document.documentElement,
      `--theme-color-h`,
      h,
      RendererStyleFlags2.DashCase
    );
    this.renderer.setStyle(
      document.documentElement,
      `--theme-color-s`,
      s + '%',
      RendererStyleFlags2.DashCase
    );
    this.renderer.setStyle(
      document.documentElement,
      `--theme-color-l`,
      l + '%',
      RendererStyleFlags2.DashCase
    );
    this.themeColor = H;
  }

  ngOnInit() {
    this.element.nativeElement
      .querySelector(`#color-input`)
      .addEventListener('change', (e) => {
        this.setTheme((<HTMLInputElement>e.target).value);
      });
  }

  openThemeHandler(event) {
    console.log(event);
  }
}
