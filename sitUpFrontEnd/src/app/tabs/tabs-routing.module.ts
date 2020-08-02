import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'analysisTab',
        loadChildren: () => import('../analysisTab/analysisTab.module').then(m => m.analysisTabPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
      },
      {
        path: 'profileTab',
        loadChildren: () => import('../profileTab/profileTab.module').then(m => m.profileTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/analysisTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/analysisTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
