import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: homePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class homePageRoutingModule {}
