import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoPage } from './demo.page';

const routes: Routes = [
  {
    path: '',
    component: DemoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoPageRoutingModule {}
