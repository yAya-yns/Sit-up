import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandInPageRoutingModule } from './land-in-routing.module';

import { LandInPage } from './land-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandInPageRoutingModule
  ],
  declarations: [LandInPage]
})
export class LandInPageModule {}
