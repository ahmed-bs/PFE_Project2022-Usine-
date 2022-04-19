import { Injectable } from '@angular/core';
import { Centre } from '../Models/centre';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  baseUrl : string = 'http://localhost:3802/magasin';
  baseUrl1 : string = 'http://localhost:3802/nbreM';
  baseUrl2 : string = 'http://localhost:3802/magasins';

  // 
  constructor(private http: HttpClient,private authService :AuthService) { }

  getMagasins(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
  }

    // test si le nom du magasin exist ou nn
    getMagasinUtilise(nomMag: string): Observable<any> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.baseUrl2}/${nomMag}`
      return this.http.get(url,{headers:httpHeaders});
    }


  getNbMagasins(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl1}`,{headers:httpHeaders});
  }

  getMagasin(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
  }


  createMagasin(magasin:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post(this.baseUrl,magasin,{headers:httpHeaders});
  }


  updateMagasin(id: number, value:any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
  }

  

  deleteMagasin(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders}); 
  }

  //  getMagasinList(): Observable<Centre[]> {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  //   return this.http.get<Magasin[]>(this.baseUrl,{headers:httpHeaders});
  //   return this.http.get<Centre[]>(this.baseUrl);
   
  // }
}