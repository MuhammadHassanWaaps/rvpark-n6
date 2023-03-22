import { Component, OnInit, ViewChild, Input, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  extends BasePage implements  OnInit {

  rooms = []
  @Input('room') room: any;
  currentUser: any;
  isSender: boolean = false;
  park_id;
  sockets;
  loading;
  message: any;
  messages: any[] = [];
  chatInterval: any;
  data: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("this is room",this.room);

    const string: any = localStorage.getItem('user');
    let user = JSON.parse(string);
    this.currentUser = user;
    console.log("Current User : ", this.currentUser);
    console.log("Data : ", this.data);
    // if (this.currentUser.id == this.data.res.sender_id) {
    //   this.isSender = true;
    // }
    // this.getAllUserMessages(this.data);
    // this.loading = true;
    // this.chatInterval = window.setInterval(async () => {
    //   console.log(this.sockets.socketId);
    //   if(this.sockets.socketId){
    //     clearInterval(this.chatInterval);

    //     // const res = await this.sockets.getChannelId(this.data);
    //     // await this.sockets.broadcastAuth();
    //     // await this.sockets.sendMessageViaSocket();
    //     // const msgs = await this.sockets.getMessageList() as [];
    //     // console.log(msgs);
    //     // this.messages = msgs.reverse();
    //     // this.loading = false;



    //   }
    // },
    //  1000

    //  );

    // this.events.subscribe("received:chat", data => {
    //   console.log(data);
    //   this.messages.push(data);
    // })

  }

  async ionViewWillEnter(){

    // const params = this.nav.getQueryParams();
    // console.log('this is data', params);

    // if (params) {
      // let id = JSON.parse(params['park_id']);
      // this.park_id = id;

      // if(!id){
      //   this.nav.pop();
      //   return;
      // }

      // this.initialize(id);


    // } else {
    //   this.nav.pop();
    //   return;
    // }
    await this.setData();
    this.getChannels()
  }

  async getChannels(){
    const res = await this.network.getChannels(this.park_id);
    console.log(res);
    this.messages = res;
  }

  async handleRefresh($event){
    const res = await this.network.getChannels(this.park_id);
    console.log(res);
    this.messages = res;
    $event.target.complete();
  }

  setData() {
    return new Promise( async resolve => {
      const obj = await localStorage.getItem('user') as string;
      if(!obj){
        this.nav.pop();
      }
      this.currentUser = JSON.parse(obj);
      console.log(this.currentUser);
      resolve(true);
    })

    // if (this.currentUser.id == this.room.sender) {
    //   this.isSender = true;
    // }
  }

  goToChatRoom(item) {
    // let data = {
    //   res: this.room,
    //   sender_id: this.room.sender,
    //   reciver_id: this.room.reciver,
    // };
    // this.modals.present(ChatViewComponent, { data });
    let obj = {
      id: item.park_id,
      user_id: this.currentUser.id
    }
    this.modals.present(ChatBoxComponent,{data:obj})
  }

  back(){
    this.modals.dismiss();
  }
}
