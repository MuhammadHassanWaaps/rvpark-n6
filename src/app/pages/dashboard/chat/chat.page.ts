import { Component, OnInit, ViewChild, Input, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  extends BasePage implements  OnInit {
  @Input('room') room: any;
  currentUser: any;
  isSender: boolean = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("this is room",this.room);
    this.setData();
  }

  async setData() {
    // const string = await this.storageService.get('user');
    // this.currentUser = JSON.parse(string).user;
    // console.log(this.currentUser);
    // if (this.currentUser.id == this.room.sender) {
    //   this.isSender = true;
    // }
  }

  goToChatRoom() {
    // let data = {
    //   res: this.room,
    //   sender_id: this.room.sender,
    //   reciver_id: this.room.reciver,
    // };
    // this.modals.present(ChatViewComponent, { data });
    this.modals.present(ChatBoxComponent)
  }
}
