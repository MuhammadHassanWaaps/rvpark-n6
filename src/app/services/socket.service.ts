import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  socketData:any = null;
  socketId = null;
  channelId = null;
  auth = null;

  constructor(private network: NetworkService, public events: EventsService) {
    this.socket = new WebSocket('wss://kjrvportal.com:3001/app/67e75c5e-40ba-4a6d-88bc-587dd7a1a8fe?protocol=7&client=js&version=8.0.1&flash=false');
    this.socket.addEventListener('message', (event) => {


      console.log(event);
      let data = event ? event.data : null;

      if(data){
        var uy = JSON.parse(data);
        var ev = uy["event"];
        // uy["data"] = JSON.parse(uy["data"]);

        if(ev == "pusher:connection_established"){
          this.socketData = uy;
          console.log(this.socketData);
          let json = JSON.parse(this.socketData["data"]);
          console.log(json)
          // let json2 = JSON.stringify()
          this.socketId = json["socket_id"]
          console.log(this.socketId);
        }

        if(ev == "chat.message"){
          var uy = JSON.parse(data);
          uy["data"] = JSON.parse(uy["data"]);
          console.log(uy["data"]["data"])
          this.events.publish("received:chat", uy["data"]["data"]);

        }

      }





    });

    this.socket


  }

  getChannelId(params){

    return new Promise( async resolve => {

      if(this.socketId){

        const res = await this.network.chatChannelCreate(params.user_id, params.id);
        console.log(res);
        this.channelId = res.id;
        console.log(this.channelId)
        resolve(res);

      }

    })
  }

  broadcastAuth(){

    return new Promise( async resolve => {

      let params = {
        socket_id: this.socketId,
        channel_name: `private-Chat.Channel.${this.channelId}`
      }
      const res = await this.network.broadcastingAuth(params);

      let authObj = JSON.parse(res);
      this.auth = authObj['auth']
      console.log(this.auth);
      resolve(res);

    })


  }

  sendMessageViaSocket(){

    return new Promise( resolve => {

      let obj =
      {
        "event": "pusher:subscribe",
        "data": {
            "auth": this.auth,
            "channel": `private-Chat.Channel.${this.channelId}`
        }
      }
      this.socket.send( JSON.stringify(obj));

      resolve(true);

    })

  }

  getMessageList(){
    return new Promise( async resolve => {
      const res = await this.network.getChatMessages(this.channelId);
      resolve(res);
    })
  }



  async connect(params: any){


    // console.log(this.socket);



    // if(this.socket){
    //   this.socket.connect();
    //   this.socket.on('connect', data => {
    //     console.log(data);
    //   })
    // }


  }

  disconnect(){
    this.socket.disconnect();

  }

  sendChatMessages(msg){
    let obj = {
      channel_id: this.channelId,
      message: msg
    }
    return this.network.sendChatMessages(obj);
  }

  changeToAdminSocket() {
    this.socket.disconnect();
    // this.config.url = 'http://192.168.43.142:9781'; // Note the port change
    // this.socket = new Socket(this.config);
  }
}
