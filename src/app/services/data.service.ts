import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NetworkService } from './network.service';
const splash = require('src/app/data/splash.json');
const slides = require('src/app/data/slides.json');
const home_categories = require('src/app/data/home_categories.json');
const home_categories_boxed = require('src/app/data/home_categories_boxed.json');
const menus = require('src/app/data/menus.json');
const camp_fires = require('src/app/data/camp-fires.json');
const texidermy = require('src/app/data/texidermy.json');
const game_recipes = require('src/app/data/game-recipes.json');
const adventures = require('src/app/data/adventures.json');
const outfitters = require('src/app/data/outfitters.json');
const datings = require('src/app/data/datings.json');
const nationwide_laws = require('src/app/data/nationwide-laws.json');
const tie_a_ture = require('src/app/data/tie-a-ture.json');
const profile_items = require('src/app/data/profile-items.json');
const stores = require('src/app/data/stores.json');
const dashboard = require('src/app/data/dashboard.json');
const footerLinks = require('src/app/data/links.json');
const tacos = require('../data/tacos/tacos.json');
const featuredlistdata = require('../data/featuredlistdata.json');
const menu_details = require('src/app/data/menu-details.json');
const checkout_detail = require('src/app/data/checkout.json');
const cities = require('src/app/data/cities.json');
@Injectable({
  providedIn: 'root',
})
export class DataService {
  races_data: any = [];
  cart;
  chat_data;
  equipment;
  searchValueChanged: BehaviorSubject<any>;
  dataId;
  user_data;
  

  constructor(private network: NetworkService) {
    this.searchValueChanged = new BehaviorSubject(null);
  }

  getTacos() {
    return tacos;
  }

  getFooterLinks() {
    return footerLinks;
  }

  getSplashImages() {
    return splash;
  }

  getDashboardData() {
    return dashboard;
  }

  getHomeSlides() {
    return slides;
  }

  getHomeCategories() {
    return home_categories;
  }

  getHomeCategoriesBoxed() {
    return home_categories_boxed;
  }

  getNews() {
    return [];
  }

  getDrivers() {
    return [];
  }

  getStores() {
    return stores;
  }

  getMenus() {
    return menus;
  }

  getSpecificMenus(arr) {
    return menus.map((menu) => ({
      ...menu,
      submenus: menu.submenus?.filter((x) => !arr.includes(x.title)),
    }));
  }

  getGameRecepies() {
    return game_recipes;
  }

  getAdventres() {
    return adventures;
  }

  getOutfitters() {
    return outfitters;
  }

  getDatings() {
    return datings;
  }

  getNationwideLaws() {
    return nationwide_laws;
  }

  getTieATure() {
    return tie_a_ture;
  }

  getProfileItems() {
    return profile_items;
  }

  getUser() {
    return {
      name: 'John Smith',
      email: 'john_smith22@gmail.com',
      image: 'assets/images/app_user.png',
      gender: 'Male',
      dob: '12 Apr 1994',
      address: '7812 Coopers Hawk Trl, Machesney Park, IL, 61115',
      password: '123456',
    };
  }

  getTexidermy1() {
    return texidermy.filter((x) => x.row === 1);
  }

  getTexidermy2() {
    return texidermy.filter((x) => x.row === 2);
  }

  getCampFires() {
    return camp_fires;
  }

  getRaceEvents(id) {
    console.log(id);

    return [];
  }

  getRaceEventById(id) {
    return [];
  }

  getDriversByRaceId(id) {
    return {};
  }

  getDriverById(id) {
    return {};
  }

  getDriversById(id) {
    return [];
  }

  getPosition(race_id, driver_id) {
    return {};
  }
  getMenuDetail() {
    return menu_details;
  }
  getCheckOutDetail() {
    return checkout_detail;
  }
  getCities(params){
    // let c = cities;
    // let r = Object.keys(c[0]);
    // let y = c[0][state];
    // console.log(state, y)

    // return y;

    return new Promise( async resolve => {
      const res = await this.network.getCities(params)
      resolve(res);
    })
  }

  getStates() {

    // let c = cities;
    // let r = Object.keys(c[0]);
    // console.log(c);
    // return r;


    return new Promise( async resolve => {
      const res = await this.network.getStates()
      resolve(res);
    })
  }
}
