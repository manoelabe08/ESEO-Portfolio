import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultatsPage } from './resultats.page';

const routes: Routes = [
  {
    path: '',
    component: ResultatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultatsPageRoutingModule {}
