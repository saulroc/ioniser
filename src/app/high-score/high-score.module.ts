import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighScorePageRoutingModule } from './high-score-routing.module';

import { HighScorePage } from './high-score.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighScorePageRoutingModule
  ],
  declarations: [HighScorePage]
})
export class HighScorePageModule {}
