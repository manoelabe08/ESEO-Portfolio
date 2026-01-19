import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationCentrePageRoutingModule } from './observation-centre-routing.module';

import { ObservationCentrePage } from './observation-centre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationCentrePageRoutingModule
  ],
  declarations: [ObservationCentrePage]
})
export class ObservationCentrePageModule {}
