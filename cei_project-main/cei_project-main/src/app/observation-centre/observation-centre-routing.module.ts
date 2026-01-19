import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationCentrePage } from './observation-centre.page';

const routes: Routes = [
  {
    path: '',
    component: ObservationCentrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservationCentrePageRoutingModule {}
