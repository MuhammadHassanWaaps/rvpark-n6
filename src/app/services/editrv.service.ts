import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class EditrvService {

  constructor(private network: NetworkService) { }

  editRv(data) {
    return new Promise(async (resolve) => {
      const res = await this.network.editEv(data);
      console.log(res);
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
