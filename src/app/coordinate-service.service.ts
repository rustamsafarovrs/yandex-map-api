import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinateServiceService {
  cityCoordinates = new BehaviorSubject<any>(null);

  constructor() {
    this.cityCoordinates.next({
      dushanbe: [38.574024, 68.786647],
      khujand: [40.281493, 69.620905]
    });
  }
}
