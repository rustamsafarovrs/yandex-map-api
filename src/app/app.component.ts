import {Component, OnInit} from '@angular/core';
import ymaps from 'ymaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myMap;
  yMaps;

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    ymaps
      .load('https://api-maps.yandex.ru/2.1/?apikey=1fcd605d-9dde-4bf2-92be-540cc8637956&lang=ru_RU&load=Map')
      .then(maps => {
        this.myMap = new maps.Map('my-map', {
          center: [55.751574, 37.573856],
          zoom: 9
        });
        this.myMap.events.add('click', (e) => {
          this.myMap.geoObjects.removeAll();
          const coords = e.get('coords');
          const clickedPlace = new maps.Placemark(coords);
          maps.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            console.log(firstGeoObject.getAddressLine());
          });
          this.myMap.geoObjects.add(clickedPlace);
        });
      })
      .catch(error => console.log('Failed to load Yandex Maps', error));
  }

}
