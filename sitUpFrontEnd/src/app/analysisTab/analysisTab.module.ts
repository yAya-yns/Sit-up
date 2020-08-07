import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { analysisTabPage } from './analysisTab.page';

import { analysisTabPageRoutingModule } from './analysisTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    analysisTabPageRoutingModule
  ],
  declarations: [analysisTabPage]
})
export class analysisTabPageModule {}
