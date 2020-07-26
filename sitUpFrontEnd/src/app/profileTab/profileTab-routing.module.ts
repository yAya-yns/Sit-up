import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profileTabPage } from './profileTab.page';

const routes: Routes = [
  {
    path: '',
    component: profileTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class profileTabPageRoutingModule {}
