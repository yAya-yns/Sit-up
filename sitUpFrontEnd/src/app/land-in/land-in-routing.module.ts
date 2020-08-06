import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LandInPage } from './land-in.page';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: LandInPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandInPageRoutingModule {}
