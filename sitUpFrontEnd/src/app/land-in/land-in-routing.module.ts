import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LandInPage } from './land-in.page';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: LandInPage
  }
  // ,
  // {
  //   path: 'tabs',
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
  //     },
  //     {
  //       path: 'home',
  //       loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
  //     },
  //     {
  //       path: 'tab3',
  //       loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
  //     },
  //     {
  //       path: '',
  //       redirectTo: '/tabs/home',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // {
  //   path: 'tabs',
  //   redirectTo: '/tabs/home',
  //   pathMatch: 'full'
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandInPageRoutingModule {}
