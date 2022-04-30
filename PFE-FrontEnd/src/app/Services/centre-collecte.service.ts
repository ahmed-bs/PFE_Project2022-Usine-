import { Injectable } from '@angular/core';
import { Centre } from '../Models/centre';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class CentreCollecteService {

  baseUrl : string = 'http://localhost:3802/centre';
  baseUrl1 : string = 'http://localhost:3802/nbreC';
  baseUrl2 : string = 'http://localhost:3802/centres';
  baseUrl3 : string = 'http://localhost:3802/tel';
  

  //
  constructor(private http: HttpClient ,private authService :AuthService) { }

  getCentres(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});

  }

  // test si le nom du collecteur exist ou nn
  getCollecteurUtilise(nomCollecteur: string): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl2}/${nomCollecteur}`
    return this.http.get(url,{headers:httpHeaders});
  }

    // test si le telephone exist ou nn
    getTelUtilise(tel: number): Observable<any> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.baseUrl3}/${tel}`
      return this.http.get(url,{headers:httpHeaders});
    }

  getNbCentres(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl1}`,{headers:httpHeaders});
  }

  getCentre(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
  }


  createCentre(centre:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post(this.baseUrl,centre,{headers:httpHeaders});
  }


  updateCentre(id: number, value:any): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
   
  }

  

  deleteCentre(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders}); 
  }

   getCentreList(): Observable<Centre[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Centre[]>(this.baseUrl,{headers:httpHeaders});
   
  }
}

