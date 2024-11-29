import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearviajePageRoutingModule } from './crearviaje-routing.module';

import { CrearviajePage } from './crearviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearviajePageRoutingModule
  ],
  declarations: [CrearviajePage]
})
export class CrearviajePageModule {}
