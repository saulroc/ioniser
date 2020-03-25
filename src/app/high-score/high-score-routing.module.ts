import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HighScorePage } from './high-score.page';

const routes: Routes = [
  {
    path: '',
    component: HighScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HighScorePageRoutingModule {}
