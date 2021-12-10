import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WrapperComponent } from './shared/wrapper/wrapper.component';
import { StatusCardsComponent } from './components/status-cards/status-cards.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResumeComponent } from './components/resume/resume.component';
import { FieldWidgetComponent } from './components/field-widget/field-widget.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'resume', component: ResumeComponent },
  {
    path: 'theming',
    component: WrapperComponent,
    children: [
      { path: '', redirectTo: '/statusCards', pathMatch: 'full' },
      { path: 'statusCards', component: StatusCardsComponent },
      { path: 'fieldWidget', component: FieldWidgetComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
