import { Injectable } from '@angular/core';
import { StorageService } from './basic/storage.service';
// import { ImageService } from './image.service';
import { NetworkService } from './network.service';
import { UtilityService } from './utility.service';
const users = require('src/app/data/users.json');
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user:any = null;
  role_id:any =null;
  // roleId = 1;
  constructor(
    // public image: ImageService,
    public network: NetworkService,
    public utility: UtilityService,
    public storage: StorageService,
  ) {
    this.getUserRoleId();
    this.getUser()
  }

  async getUserRoleId(){
    return new Promise( async resolve => {
      const res = await localStorage.getItem("role_id");
      if(res){
        this.role_id = Number(res);
        resolve(res);
      } else {
        resolve(null);
      }
    });

  }

  getUserData() {
    return new Promise((resolve) => {
      this.network.getUserData().then( (res: any) => {
        console.log(res);
        this.user = res;
        this.role_id = this.user['role_id'];
        resolve(true);
      }, err => {
        console.log(err);
        this.user = null;
        resolve(false);
      })

    });
  }

  login(formdata) {
    return new Promise((resolve) => {

      this.network.login(formdata).then( async (res) => {
        console.log(res);
        // this.setToken(record['id']);
        this.user = res.user;
        this.setToken(res.token);
        this.setUser(res.user)
        const res2 = await this.network.getUserRoleId();
        this.role_id = res2;
        await this.storage.set("role_id",res2);
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })

    });
  }

  register(formdata) {
    return new Promise((resolve) => {

      this.network.register(formdata).then( async (res) => {
        console.log(res);
        // this.setToken(record['id']);
        this.user = res.user;
        this.setToken(res.token);
        this.setUser(res.user)
        const res2 = await this.network.getUserRoleId();
        this.role_id = res2;
        await this.storage.set("role_id",res2);
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })

    });
  }

  updateRenterProfileOne(formdata){

    return new Promise((resolve) => {

      this.network.registerWithRenter(formdata).then( res => {
        console.log(res);
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })

    });

  }

  updateRenterProfileTwo(formdata){

    return new Promise((resolve) => {

      this.network.registerWithRenterTwo(formdata).then( res => {
        console.log(res);
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })

    });

  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return new Promise<any>(async(res) => {
      let json = await localStorage.getItem('user');
      if (json && json !== '') {
        let obj = JSON.parse(json);
        this.user = obj;
        res(obj);
        //console.log('USER_OBJ', obj);
        // if (obj.profile_image)
          // obj.profile_image = this.image.getImageUrl(obj.profile_image);

          // res(obj);
      } else res(null);
    });
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  async getIsAuthenticated() {
    return new Promise<boolean>(async (resolve) => {
      this.network.getUser().then( v => {
        console.log('getUserFromAPI', v);
        resolve(true);
      }, err => {
        resolve(false);
      });
    });

    // this.user = this.dataService.getUser();
  }

  async getMyOrders(){
    return new Promise<any>(async (resolve) => {
      this.network.getMyOrders().then( v => {
        console.log('getTransatcions', v);
        resolve(v);
      }, err => {
        resolve(err);
      });
    });
  }

  // getUser() {
  //   return new Promise(async (resolve) => {
  //     let token = await this.getToken();
  //     console.log(token);
  //     let record = users.find((x) => parseInt(x.id) == parseInt(token));
  //     if (record) {
  //       this.user = record;
  //       resolve(record);
  //     } else {
  //       this.user = null;
  //       resolve(false);
  //     }
  //   });
  // }

  setToken(token) {
    return localStorage.setItem('token', token);
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async isSelf(userId) {
    let user = await this.getUser();
    return user.id === userId;
  }

  getProfileImage(profile_image) {
    return (
      !this.utility.isNullOrEmpty(profile_image) &&
      !profile_image.includes('http')
    );
    // ? this.image.getImageUrl(profile_image)
    // : !this.utility.isNullOrEmpty(profile_image)
    // ? profile_image
    // : this.image.getDefaultImg();
  }

  sendResetPassword(formdata){
    return new Promise((resolve) => {

      this.network.forgetPassword(formdata).then( async (res) => {
        console.log(res);

        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })

    });
  }
}
