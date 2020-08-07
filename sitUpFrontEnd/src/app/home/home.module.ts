import { File } from '@ionic-native/file/ngx';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { homePage } from './home.page';

import { homePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    homePageRoutingModule,
  ],
  declarations: [homePage],
  providers: [
    File
  ]
})
export class homePageModule {}
