import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CarousalComponent } from './components/carousal/carousal.component';
import { ResumeComponent } from './components/resume/resume.component';
import { FieldWidgetComponent } from './components/field-widget/field-widget.component';
import { PropertyPanelComponent } from './components/property-panel/property-panel.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { PropertyPanelContainerComponent } from './components/property-panel-container/property-panel-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
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
    CarousalComponent,
    ResumeComponent,
    FieldWidgetComponent,
    PropertyPanelComponent,
    PropertyPanelContainerComponent,
    ComponentListComponent,
    LayerAccessibilityDirective,
    BlockAccessibilityDirective,
    TabbableAccessibilityDirective,
    SkipBlockAccessibilityDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
