import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public utility: UtilityService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.callToken()).pipe(
      switchMap(token => {
        var cloneRequest = this.addSecret(req, token);
        cloneRequest = this.encryptData(cloneRequest, '123')
        console.log(cloneRequest);
        return next.handle(cloneRequest);
      })
    );

  }

  encryptData(request: HttpRequest<any>, value: any){

    // if(request.method == 'GET'){

    //     if (request.url.indexOf("?") > 0) {

    //       let mainUrl = request.url.substr(0, request.url.indexOf("?") + 1);
    //       let parts = request.url.substr(request.url.indexOf("?") + 1, request.url.length)

    //       let encoded: string = btoa(parts);

    //       console.log(mainUrl, parts, encoded);
    //       let r2 = request.clone({
    //         url: mainUrl + encoded
    //       })

    //       //return r2;

    //     }

    //   }

      // if(request.method == 'POST'){

      //   let r3;
      //   if (request.url.indexOf("?") > 0) {
      //     let mainUrl = request.url.substr(0, request.url.indexOf("?") + 1);
      //     let parts = request.url.substr(request.url.indexOf("?") + 1, request.url.length)

      //     let encoded: string = btoa(parts);

      //     console.log(mainUrl, parts, encoded);
      //     r3 = request.clone({
      //       url: mainUrl + encoded
      //     })
      //   }

      //   if (request.body || request.body.length > 0) {
      //     var r4 = r3 ? r3 : request;
      //     const r5 = r4.clone({
      //         body: btoa(JSON.stringify(request.body))
      //     });
      //     // return r5;
      //   }

      // }

      return request

  }

  callToken() {
    return new Promise(resolve => {

      let token = localStorage.getItem('token');
      resolve(token);
      // this.sqlite.getCurrentUserAuthorizationToken().then( v => {
      //   // console.log("token must be here", v);
      //   resolve(v);
      // }).catch( err => {
      //   console.error(err);
      //   resolve(null)
      // });

    });
  }

  // private addSecret(request: HttpRequest<any>, value: any){
  //   let v = value ? value : '';
  //   let clone = request.clone({
  //     setHeaders : {
  //       Authorization: 'Bearer ' + v,
  //       Accept: "*",
  //       'Content-Type': "application/json",
  //       'X-Requested-With': 'XMLHttpRequest'
  //     }
  //   })
  //   return clone;
  // }

  private addSecret(request: HttpRequest<any>, value: any) {

    let v = value ? value : localStorage.getItem('token');

    let obj = {
      Authorization: 'Bearer ' + v
    }


    obj['Accept'] = 'application/json';
    let cnt = request.headers.get('Content-Type');
    if (cnt == 'application/json') {
      obj['Content-Type'] = request.headers.get('Content-Type');
    }

    const clone = request.clone(
      {
        setHeaders: obj
      }
    );

    return clone;
  }
}
