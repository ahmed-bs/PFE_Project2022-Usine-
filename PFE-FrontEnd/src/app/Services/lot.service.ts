import { Injectable } from '@angular/core';
import { Centre } from '../Models/centre';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Lotervice {

  baseUrl : string = 'http://localhost:3802/lot';
  baseUrl1 : string = 'http://localhost:3802/nbreM';

  // ,private authService :AuthService
  constructor(private http: HttpClient) { }

  getLots(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl}`);
  }

  getNbLots(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl1}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl1}`);
  }

  getLot(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }


  createLot(lot:any){
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.post(this.baseUrl,lot,{headers:httpHeaders});
    return this.http.post(this.baseUrl,lot);
  }


  updateLot(id: number, value:any): Observable<Object> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.put(url, value,{headers:httpHeaders});
    return this.http.put(url, value);
  }

  

  deleteLot(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    // return this.http.delete(url,{headers:httpHeaders});
    return this.http.delete(url);
 
 
  }

   getLotList(): Observable<Centre[]> {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get<Lot[]>(this.baseUrl,{headers:httpHeaders});
    return this.http.get<Centre[]>(this.baseUrl);
   
  }
}