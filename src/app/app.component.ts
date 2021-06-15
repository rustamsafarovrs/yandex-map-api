import {Component, OnInit} from '@angular/core';
import {YaEvent, YaReadyEvent} from 'angular8-yandex-maps';
import {CoordinateServiceService} from "./coordinate-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: ymaps.Map;
  point: number[];
  center: number[] = [38.574024, 68.786647];
  addressLine;
  cityCoordinates = {};

  constructor(private coordinateService: CoordinateServiceService) {
  }

  ngOnInit(): void {
    this.coordinateService.cityCoordinates.subscribe((data) => {
      this.cityCoordinates = data;
    });

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
      this.center = res.geoObjects.get(0).geometry.getBounds()[0];
      this.map.setCenter(this.center, 15,
        // включаем масштабирование карты колесом
        {duration: 2111}
      );
    })
      .catch(error => console.log('Yandex Map Error: ', error));
  }

  onCityChange($event: any): void {
    console.log($event.target.value);
    console.log(  this.cityCoordinates[$event.target.value]);
    this.map.setCenter(this.cityCoordinates[$event.target.value], 12, {
      checkZoomRange: true
    });
  }
}
