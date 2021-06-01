import {Component, OnInit} from '@angular/core';
import {YaEvent, YaReadyEvent} from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: ymaps.Map;
  point: number[];
  center: number[] = [55.76, 37.64];
  addressLine;

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.point = [55.847, 37.6];
  }

  onYaActionEnd($event: YaEvent<ymaps.Map>): void {
    this.point = $event.event.originalEvent.target.getCenter();
    $event.ymaps.geocode(this.point).then((res: any) => {
      const firstGeoObject = res.geoObjects.get(0);
      this.addressLine = firstGeoObject.getAddressLine();
    });
  }

  onMapReady($event: YaReadyEvent<ymaps.Map>): void {
    this.map = $event.target;
  }

  onDetectLocationClick(): void {
    ymaps.geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true,
    }).then((res) => {
      console.log(res.geoObjects.get(0).properties.get('metaDataProperty'));
    })
      .catch(error => console.log('Yandex Map Error: ', error));
  }
}
