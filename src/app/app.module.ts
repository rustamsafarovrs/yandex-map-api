import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularYandexMapsModule, YaConfig} from 'angular8-yandex-maps';

const mapConfig: YaConfig = {
  apikey: '1fcd605d-9dde-4bf2-92be-540cc8637956',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
