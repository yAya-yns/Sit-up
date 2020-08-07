import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { analysisTabPage } from './analysisTab.page';

const routes: Routes = [
  {
    path: '',
    component: analysisTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class analysisTabPageRoutingModule {}
