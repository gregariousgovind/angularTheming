import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { StatusCardsComponent } from './components/status-cards/status-cards.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { ButtonComponent } from './components/button/button.component';
import { ThemingComponent } from './components/theming/theming.component';
import { WrapperComponent } from './shared/wrapper/wrapper.component';

import { BlockAccessibilityDirective } from './shared/directives/block-accessibility.directive';
import { LayerAccessibilityDirective } from './shared/directives/layer-accessibility.directive';
import { TabbableAccessibilityDirective } from './shared/directives/tabbable-accessibility.directive';
import { SkipBlockAccessibilityDirective } from './shared/directives/skip-block.directive';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RoutingModule],
  exports: [
    LayerAccessibilityDirective,
    BlockAccessibilityDirective,
    TabbableAccessibilityDirective,
    SkipBlockAccessibilityDirective,
  ],
  declarations: [
    AppComponent,
    WrapperComponent,
    StatusCardsComponent,
    HeaderComponent,
    LeftPanelComponent,
    ButtonComponent,
    ThemingComponent,
    LandingPageComponent,
    LayerAccessibilityDirective,
    BlockAccessibilityDirective,
    TabbableAccessibilityDirective,
    SkipBlockAccessibilityDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
