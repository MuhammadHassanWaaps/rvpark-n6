import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {


  @Input() data: any;
  // @ViewChild(ScrollToBottomDirective)
  // scroll: ScrollToBottomDirective;
  messagesRes: any;
  currentUser: any;
  item: any;
  value: any;
  message: any;
  messages: any[] = [];
  chatInterval: any;
  isSender: boolean = false;
  constructor(injector: Injector) {
    // super(injector);
  }

  ngOnInit() {
    console.log(this.data);
    const string: any = localStorage.getItem('user');
    let user = JSON.parse(string);
    this.currentUser = user.user;
    console.log("Current User : ", this.currentUser);
    if (this.currentUser.id == this.data.res.sender_id) {
      this.isSender = true;
    }
    this.getAllUserMessages(this.data);
    // this.chatInterval = window.setInterval(() => {
    //   this.getAllUserMessages(this.data);
    // }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.chatInterval);
  }

  myScrollContainer: any;
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  back() {
    // this.modals.dismiss();
  }
  async getAllUserMessages(item) {
    // let data = { ...item };
    // this.messagesRes = await this.network.getAllUserMessages(data);
    // if (this.messages.length !== this.messagesRes.messages.length) {
    //   this.messages = this.messagesRes.messages;
    // }
    //console.log({ 'Messages Response': this.messagesRes });
  }

  async sendMessage(item) {
    // let mes = { ...item };
    // let time = moment('01:15:00 PM', 'h:mm:ss A').format('HH:mm:ss');
    // console.log("tiem " , time);

    // let data = await this.network.sendMessage({
    //   message: this.value,
    //   user_id: this.currentUser.id,
    //   chat_room_id: this.data.res.id,
    //   // created_at: this.data.message.created_at,
    //   reciver_id: this.data.reciver_id,
    // });
    // this.message = data;
    // console.log(this.message);
    // this.messages.push(this.message);
    // this.value = '';
  }
}
