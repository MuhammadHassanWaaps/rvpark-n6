import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EventsService } from './basic/events.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  editEv(data: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public utility: UtilityService,
    public api: ApiService,
    public router: Router,
    private events: EventsService
  ) {
    // console.log('Hello NetworkProvider Provider');
  }

  serialize = (obj: any) => {
    let str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string = p;
        let r =
        str.push(`${f}=${obj[f]}`);
      }
    }
    return str.join('&');
  };

  login(data) {
    return this.httpPostResponse('login', data, null, true, true);
  }

  register(data) {
    return this.httpPostResponse('register', data, null, true, true);
  }

  forgetPassword(data) {
    return this.httpPostResponse('forget_password', data, null, true, true);
  }

  registerCard(data) {
    return this.httpPostResponse('set-stripe-token', data, null, true, true);
  }


  searchPark(data) {
    return this.httpPostResponse('search-park', data, null, true, true);
  }


  getStripePublicKey() {
    return this.httpGetResponse('get-stripe-public-key', null, true, true);
  }

  getOrderDetails(data) {
    return this.httpGetResponse(
      'order-detail?order_id=' + data,
      null,
      true,
      true
    );
  }

  registerWithRenter(data) {
    return this.httpPostResponse(
      'register_with_renter',
      data,
      null,
      true,
      true
    );
  }

  getUserData() {
    return this.httpGetResponse(
      'user-detail',
      null,
      true,
      true
    );
  }

  registerWithRenterTwo(data) {
    return this.httpPostResponse(
      'register_with_renter_two',
      data,
      null,
      true,
      true
    );
  }
  addPark(data) {
    return this.httpPostResponse('add_park', data, null, true, true);
  }

  deletePark(data) {
    return this.httpPostResponse('delete-park', data, null, true, true);
  }

  deleteSpot(data) {
    return this.httpPostResponse('delete-spot', data, null, true, true);
  }

  deleteImage(data) {
    return this.httpPostResponse('delete-park-image', data, null, true, true);
  }
  editPark(data) {
    return this.httpPostResponse('edit_park', data, null, true, true);
  }
  addSpots(data) {
    return this.httpPostResponse('add_spots', data, null, true, true);
  }
  updateSpots(data) {
    return this.httpPostResponse('edit-spot', data, null, true, true);
  }
  uploadImage(data) {
    return this.httpPostResponse('add_picture', data, null, true, true);
  }
  getStates() {
    return this.httpGetResponse('states', null, false, false)
  }
  getCities(params) {
    console.log(params);
    let str = this.serialize(params);
    console.log(str);
    let url = 'cities' + ( str ? '?' + str : '');
    return this.httpGetResponse(url, null, false, false)
  }
  getUserRoleId() {
    return this.httpGetResponse('get-user-role-id', null, true, true);
  }
  forgotPassword(data) {
    return this.httpPostResponse('auth/forgot-password', data);
  }
  getUser() {
    return this.httpGetResponse('user', null, false, false);
  }
  getMyOrders() {
    return this.httpGetResponse('/get-my-orders', null, false, false);
  }
  getMyPaymentHistory() {
    return this.httpGetResponse('get-my-payment-history', null, false, false);
  }
  getSpotlist(params = {}) {

    let str = this.serialize(params);
    let url = 'all-parks' + (str ? '?' + str : '')
    return this.httpGetResponse(url, null, false, false);
  }
  getMylist() {
    return this.httpGetResponse('get-my-parks', null, false, false);
  }
  getSpotDetail(data) {
    return this.httpPostResponse('park-detail-by-id', data, null, true, true);
  }
  postAvailableSpot(data) {
    return this.httpPostResponse('get-available-spots', data, null, true, true);
  }

  getInterests() {
    return this.httpGetResponse('profile/interests');
  }

  // getCities(id) {
  //   return this.httpGetResponse(`cities/${id}`);
  // }

  postData(data, id = null) {
    return this.httpPostResponse('posts', data, id, true);
  }

  editUser(data) {
    return this.httpPostResponse('user/edit', data, null, true);
  }

  logout() {
    return this.httpPostResponse('auth/logout', null);
  }

  getPosts(orderBy = 'created_at', sortedBy = 'desc') {
    return this.httpGetResponse(
      `posts?orderBy=${orderBy}&sortedBy=${sortedBy}`,
      null,
      true
    );
  }

  likePost(postId) {
    return this.httpPostResponse(`posts/${postId}/like`, null, null, false);
  }

  addComment(data) {
    return this.httpPostResponse('comments', data, null, false);
  }

  addOrder(data) {
    return this.httpPostResponse('add-order', data, null, false);
  }

  sendNotification(data) {
    return this.httpPostResponse('send-notification', data, null, false);
  }

  uploadProfilePicture(data) {
    return this.httpPostResponse('upload-profile-picture', data, null, false);
  }


  deletePost(post_id) {
    return this.httpDeleteResponse(`posts/${post_id}`);
  }

  getChatMessages(id) {
    return this.httpGetResponse(`chat/messages?channel_id=${id}`, null, false);
  }
  sendChatMessages(data) {
    return this.httpPostResponse(`chat/messages`, data);
  }
  getSpotDates(data) {
    return this.httpPostResponse(`get-available-between-dates`, data, null, true, false);
  }
  getOrders() {
    return this.httpGetResponse(`my-received-transactions`, null, true, false);
  }



  getFriends() {
    return this.httpGetResponse(
      `users/friends?orderBy=created_at&sortedBy=desc`,
      null,
      false
    );
  }

  getUsers() {
    return this.httpGetResponse(
      `users?orderBy=created_at&sortedBy=desc`,
      null,
      false
    );
  }

  unfriend(id) {
    return this.httpDeleteResponse(`users/unfriend-request/${id}`);
  }

  acceptRequest(id) {
    return this.httpPatchResponse(
      `users/accept-friend-request/${id}`,
      null,
      null
    );
  }

  ignoreRequest(id) {
    return this.httpDeleteResponse(`users/ignore-friend-request/${id}`);
  }

  block(id) {
    return this.httpPatchResponse(
      `users/block-friend-request/${id}`,
      null,
      null
    );
  }

  unblock(id) {
    return this.httpPatchResponse(
      `users/unblock-friend-request/${id}`,
      null,
      null
    );
  }

  addFriend(id) {
    return this.httpPostResponse(`users/add-friend/${id}`, null, null, false);
  }

  unblockFriend(id) {
    return this.httpPatchResponse(
      `users/unblock-friend-request/${id}`,
      null,
      null
    );
  }

  broadcastAuth(token) {
    return this.httpPostResponse(`broadcasting/auth?token=${token}`, null);
  }

  switchToDatingProfile(data) {
    return this.httpPostResponse(`users/dating`, data, null, false);
  }

  getDatings(dating_users, search) {
    var str = `users?orderBy=created_at&sortedBy=desc`;

    if (dating_users && dating_users != '') {
      str += `&dating_users=${dating_users}`;
    }
    if (search && search != '') {
      str += `&search=name:${search};email:${search}`;
    }

    return this.httpGetResponse(str, null, false);
  }

  searchDatingUsers(data) {
    var str = `users/dating?orderBy=created_at&sortedBy=desc`;
    var p = this.serialize(data);
    str = str + '&' + p;
    // if (search && search != '') {
    //   str += `&search=name:${search};email:${search}`;
    // }

    return this.httpGetResponse(str, null, false);
  }

  saveFcmToken(data) {
    return new Promise<any>((res) => { });
    // Todo
  }

  getEquipments() {
    return this.httpGetResponse(
      `equipments?orderBy=created_at&sortedBy=desc`,
      null,
      true
    );
  }

  getEquipmentReviews(id, page) {
    return this.httpGetResponse(
      `equipments/reviews/${id}?page=` + page,
      null,
      false
    );
  }

  addReview(data, id) {
    return this.httpPostResponse(`equipments/reviews/${id}`, data, null, true);
  }

  deleteReview(id) {
    return this.httpDeleteResponse(`equipments/reviews/${id}`);
  }

  getrecipes(page) {
    return this.httpGetResponse(
      `recipes${page ? `?page=${page}` : ''}`,
      null,
      false
    );
  }

  getProducts() {
    return this.httpGetResponse(`products`, null, false);
  }

  getProductDetail(id) {
    return this.httpGetResponse('products', id);
  }

  addProductReview(data) {
    return this.httpPostResponse('reviews', data);
  }

  addEquipmentReview(id, data) {
    return this.httpPostResponse(
      'equipments/reviews/' + id,
      data
      // false,
      // true,
      // false
    );
  }

  getMyTransactions() {
    return this.httpGetResponse('my-received-transactions', null, false, false);
  }

  getRenterParkCommission() {
    return this.httpGetResponse('get-renter-park-commission', null, false, false);
  }
  addToCart(data) {
    return this.httpPostResponse('add-cart', data);
  }

  getCart() {
    return this.httpPostResponse('get-cart', null, null, false);
  }

  getMyNotifications() {
    return this.httpGetResponse('my-notifications', null, false, false);
  }

  setFcmToken(data) {
    return this.httpPostResponse('set-fcm-token', data)
  }

  deleteCartItem(data) {
    return this.httpPostResponse('delete-cart-item', data, null, false);
  }

  getShippingAddress() {
    return this.httpGetResponse('get-shipping-address', null, false, false);
  }

  setShippingAddress(data) {
    return this.httpPostResponse('add-shipping-address', data, null, false);
  }

  editUserProfile(data) {
    return this.httpPostResponse('edit-user-profile', data, null, false);
  }
  changeSpotAvailablility(data) {
    return this.httpPostResponse('change-spot-availablility', data, null, false);
  }

  getProductReviews(id) {
    return this.httpGetResponse('reviews', id);
  }

  updatePassword(data) {
    return this.httpPostResponse(`user/password`, data, null, false);
  }

  getGroups() {
    return this.httpGetResponse(`groups`, null, false);
  }

  joinChatRoom(data) {
    return this.httpPostResponse(`users/groups/join`, data, null, false);
  }

  getChatRoomMessages(id) {
    return this.httpGetResponse(
      `chats/messages/group/${id}?page=1`,
      null,
      false
    );
  }

  leaveGroup(channel_id) {
    return this.httpPostResponse(`users/groups/leave`, { channel_id }, null);
  }

  getRanches(state = undefined, page) {
    // return this.httpGetResponse(`map-data/ranches`, null, true);
    return this.httpGetResponse(
      state
        ? `map-data/ranches/${state}?page=${page}`
        : `map-data/ranches?page=${page}`,
      null,
      true
    );
  }

  getProfessionalHunting(state = undefined, page) {
    return this.httpGetResponse(
      state
        ? `map-data/professional_hunting/${state}`
        : `map-data/professional_hunting?page=${page}`,
      null,
      true
    );
  }

  getTaxidermy(state = undefined, page) {
    return this.httpGetResponse(
      state
        ? `map-data/taxidermy/${state}?page=${page}`
        : `map-data/taxidermy?page=${page}`,
      null,
      false
    );
  }

  getProcessing(state = undefined, page) {
    return this.httpGetResponse(
      state
        ? `map-data/processing/${state}?page=${page}`
        : `map-data/processing?page=${page}`,
      null,
      false
    );
  }

  sendChatGroupMessage() { }

  addRecipe(data) {
    return this.httpPostResponse(`recipes`, data, null, true);
  }

  increaseDecrese(data, isIncreased = true) {
    return this.httpPostResponse(
      isIncreased ? 'cart/increase' : 'cart/decrease',
      data
    );
  }

  increaseDecreseRemove(data) {
    return this.httpPostResponse('cart/remove', data);
  }

  checkOut(data) {
    return this.httpPostResponse(`checkout`, data, null, true);
  }

  howToVideos() {
    return this.httpGetResponse(`how-to-videos`);
  }

  postHowToVideo(data, id) {
    return this.httpPostResponse(
      `how-to-videos${id ? `/${id}` : ''}`,
      data,
      null,
      true
    );
  }

  contactUs(data) {
    return this.httpPostResponse('contact-us', data, null, true);
  }

  getInterest(search) {
    return this.httpGetResponse(`profile/interests/${search}`);
  }

  deleteHowToVideo(id) {
    return this.httpDeleteResponse(`how-to-videos/${id}`);
  }

  commentHowToVideo(id, comment) {
    return this.httpPostResponse(
      'how-to-videos/' + id + '/comments',
      { comment },
      null,
      true
    );
  }

  getHowToVideoComments(id) {
    return this.httpGetResponse('how-to-videos/' + id + '/comments');
  }

  rateRecipe(id, rating) {
    return this.httpPostResponse(
      'recipes/' + id + '/reviews',
      { rating },
      null,
      true
    );
  }

  deleteRecipe(id) {
    console.log(id);

    return this.httpDeleteResponse(`recipes/${id}`);
  }

  deleteHowToComment(id) {
    return this.httpDeleteResponse('comments/' + id);
  }

  getUserProfile(id) {
    return this.httpGetResponse('profile/user', id);
  }

  getUserPosts(id) {
    return this.httpGetResponse('profile/posts', id);
  }

  getPostCount(id) {
    return this.httpGetResponse('profile/post-count', id);
  }

  getConnectionCount(id) {
    return this.httpGetResponse('profile/connection-count', id);
  }

  updatePackage(id, data) {
    return this.httpPostResponse(`update-package/${id}`, data);
  }

  updateMemership(user_id, payment_status, package_id) {
    return this.httpPostResponse(
      `membership/${user_id}/${payment_status}/${package_id}`,
      null
    );
  }

  updateMemershipPayment(email, package_id, token) {
    return this.httpGetResponse(
      `charge-payment/${email}/${package_id}/${token}`,
      null
    );
  }

  chatChannelCreate(user_id){
    return this.httpPostResponse('chat/channel/create', {
      user_id: user_id
    })
  }

  broadcastingAuth(params){
    return this.httpPostResponse('broadcasting/auth', params);
  }

  httpPostResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpGetResponse(
    key,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpPutResponse(key, data, id = null) {
    return new Promise((resolve, reject) => {
      // id = id ? `/${id}` : '';
      const url = key + id;

      this.api.put(key, data).subscribe((res: any) => {
        // if (showloader === true) {
        this.utility.hideLoader();
        // }
        resolve(res);
        // if (res.bool !== true) {
        //   if (showError) {
        //     this.utility.presentSuccessToast(res.message);
        //   }
        //   reject(null);
        // } else {
        //   resolve(res);
        // }
      });
    });
  }

  httpPatchResponse(key, data, id = null) {
    return new Promise<any>((resolve, reject) => {
      // id = id ? `/${id}` : '';
      const url = key + id;

      this.api.patch(key, data).subscribe((res: any) => {
        // if (showloader === true) {
        this.utility.hideLoader();
        //}
        resolve(res);
        // if (res.bool !== true) {
        //   if (showError) {
        //     this.utility.presentSuccessToast(res.message);
        //   }
        //   reject(null);
        // } else {
        //   resolve(res);
        // }
      });
    });
  }

  httpDeleteResponse(key) {
    return new Promise<any>((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        console.log(res);
        //if (showloader === true) {
        this.utility.hideLoader();
        //}
        resolve(res);

        // if (res.bool !== true) {
        //   if (showError) {
        //     this.utility.presentSuccessToast(res.message);
        //   }
        //   reject(null);
        // } else {
        //   resolve(res);
        // }
      });
    });
  }

  // default 'Content-Type': 'application/json',
  httpResponse(
    type = 'get',
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) this.utility.showLoader();

      // ;
      const url = key + (id ? '/' + id : '');

      const seq =
        type === 'get' ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe(
        (res: any) => {
          if (showloader === true) {
            this.utility.hideLoader();
          }

          if (res['bool'] == false) {
            if (showError) {
              this.utility.presentFailureToast(res.message);
            }
            reject(null);
          } else {
            resolve(res['data']);
          }
        },
        (err) => {
          const error = err.error;
          console.log('err', err);

          this.utility.hideLoader();
          if (showError) {
            let errorKeys = error?.errors ? Object.keys(error.errors) : [];
            if (errorKeys && errorKeys.length) {
              console.log('Error is', error.errors[errorKeys[0]]);

              this.utility.presentFailureToast(error.errors[errorKeys[0]][0]);
            } else {
              this.utility.presentFailureToast(
                error.message
                // + ' ' + error.errors.email
                //   ? error.errors.email[0]
                //   : ''
              );
            }
          }

          // if(err.status === 401){
          //   this.router.navigate(['splash']);
          // }

          reject(null);
        }
      );
    });
  }

  showFailure(err) {
    // console.error('ERROR', err);
    err = err ? err.message : 'check logs';
    this.utility.presentFailureToast(err);
  }
}
