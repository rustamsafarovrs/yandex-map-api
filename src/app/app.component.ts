import {Component, OnInit} from '@angular/core';
import {YaEvent} from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  point: number[];
  center: number[] = [55.76, 37.64];
  addressLine;

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.point = [55.847, 37.6];
  }

  onYaClick($event: YaEvent<ymaps.Map>): void {
    const coords = $event.event.get('coords');
    this.point = [coords[0], coords[1]];
  }

  onYaActionEnd($event: YaEvent<ymaps.Map>): void {
    this.point = $event.event.originalEvent.target.getCenter();
    $event.ymaps.geocode(this.point).then((res: any) => {
      const firstGeoObject = res.geoObjects.get(0);
      this.addressLine = firstGeoObject.getAddressLine();
    });
  }
}
