import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultatsPageRoutingModule } from './resultats-routing.module';

import { ResultatsPage } from './resultats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultatsPageRoutingModule
  ],
  declarations: [ResultatsPage]
})
export class ResultatsPageModule {}
