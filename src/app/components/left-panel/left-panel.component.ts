import {
  Component,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  public isExpanded: boolean = false;
  private leftPanelWidth: string = '80px';

  expandCollapse() {
    this.leftPanelWidth = this.isExpanded ? '50px' : '80px';
    this.isExpanded = !this.isExpanded;
    this.renderer.setStyle(
      document.documentElement,
      `--left-panel-width`,
      this.leftPanelWidth,
      RendererStyleFlags2.DashCase
    );
  }

  ngOnInit() {}
}
