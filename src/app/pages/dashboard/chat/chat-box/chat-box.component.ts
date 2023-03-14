import { Component, OnInit, Input, Injector } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent extends BasePage implements OnInit {


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
  loading = false;
  constructor(injector: Injector, private sockets: SocketService,) {
    super(injector);
  }

  ngOnInit() {
    console.log(this.data);

    const string: any = localStorage.getItem('user');
    let user = JSON.parse(string);
    this.currentUser = user;
    console.log("Current User : ", this.currentUser);
    console.log("Data : ", this.data);
    // if (this.currentUser.id == this.data.res.sender_id) {
    //   this.isSender = true;
    // }
    // this.getAllUserMessages(this.data);
    this.loading = true;
    this.chatInterval = window.setInterval(async () => {
      console.log(this.sockets.socketId);
      if(this.sockets.socketId){
        clearInterval(this.chatInterval);

        const res = await this.sockets.getChannelId(this.data);
        await this.sockets.broadcastAuth();
        await this.sockets.sendMessageViaSocket();
        const msgs = await this.sockets.getMessageList() as [];
        console.log(msgs);
        this.messages = msgs.reverse();
        this.loading = false;



      }
    }, 1000);

    this.events.subscribe("received:chat", data => {
      console.log(data);
      this.messages.push(data);
    })

  }

  ngOnDestroy(): void {
    clearInterval(this.chatInterval);
  }

  ionViewWillLeave() {
    this.sockets.disconnect();
  }

  myScrollContainer: any;
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  back() {
    this.modals.dismiss();
  }
  async getAllUserMessages(item) {
    // let data = { ...item };
    // this.messagesRes = await this.network.getAllUserMessages(data);
    // if (this.messages.length !== this.messagesRes.messages.length) {
    //   this.messages = this.messagesRes.messages;
    // }
    //console.log({ 'Messages Response': this.messagesRes });
  }

  async sendMessage() {


    let mes = this.message;

    if(!this.message){
      return;
    }

    console.log(this.message);
    this.loading = true;


    const res = await this.sockets.sendChatMessages(this.message);

    this.message = null;
    this.loading = false;

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
