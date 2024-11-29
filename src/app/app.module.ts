import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatProgressSpinnerModule, IonicStorageModule.forRoot() ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },Geolocation, provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
