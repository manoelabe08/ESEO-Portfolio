import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'resultats',
        loadChildren: () => import('../resultats/resultats.module').then( m => m.ResultatsPageModule)
      },
      {
        path: 'observation-centre',
        loadChildren: () => import('../observation-centre/observation-centre.module').then( m => m.ObservationCentrePageModule)
      },
      {
        path: 'participation',
        loadChildren: () => import('../participation/participation.module').then( m => m.ParticipationPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
