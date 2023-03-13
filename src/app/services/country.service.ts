import { Injectable } from '@angular/core';
const cit = require("./../data/cities.json");

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  cities = [];
  selectedCity = '';
  constructor() {
    this.cities = cit;
  }




}
