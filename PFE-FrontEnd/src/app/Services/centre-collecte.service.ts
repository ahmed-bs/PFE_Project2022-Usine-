import { Injectable } from '@angular/core';
import { Centre } from '../Models/centre';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentreCollecteService {

  baseUrl : string = 'http://localhost:3802/centre';
  baseUrl1 : string = 'http://localhost:3802/nbreC';

  // ,private authService :AuthService
  constructor(private http: HttpClient) { }

  getCentres(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl}`);
  }

  getNbCentres(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl1}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl1}`);
  }

  getCentre(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }


  createCentre(centre:any){
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.post(this.baseUrl,centre,{headers:httpHeaders});
    return this.http.post(this.baseUrl,centre);
  }


  updateCentre(id: number, value:any): Observable<Object> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.put(url, value,{headers:httpHeaders});
    return this.http.put(url, value);
  }

  

  deleteCentre(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    // return this.http.delete(url,{headers:httpHeaders});
    return this.http.delete(url);
 
 
  }

   getCentreList(): Observable<Centre[]> {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get<Centre[]>(this.baseUrl,{headers:httpHeaders});
    return this.http.get<Centre[]>(this.baseUrl);
   
  }
}

