import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';
import { Tank } from '../Models/tank';

@Injectable({
  providedIn: 'root'
})
export class TankService {
  baseUrl : string = 'http://localhost:3802/tanks';
  baseUrl2 : string = 'http://localhost:3802/tanksFilres';
  baseUrl3 : string = 'http://localhost:3802/qteTanksLibre';
  baseUrl4 : string = 'http://localhost:3802/qteTanksGenerale';
  baseUrl6 : string = 'http://localhost:3802/nbreT';
  // URL : Quanitite que je peux l'inserer .. date d'aujourd hui 
  baseUrl7 : string = 'http://localhost:3802/tanksQte';
  baseUrl8 : string = 'http://localhost:3802/QteG';
  baseUrl9 : string = 'http://localhost:3802/QteTanks';

  // ,private authService :AuthService 
  constructor(private http: HttpClient) { }

  getTanks(): Observable<any> {
  //  let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl}`);
  }

  getNbTanks(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl6}`);
  }

  getQteLibreAujourdhui(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl7}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl7}`);
  }

  getQteTanks(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl9}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl9}`);
  }


  getQteG(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl8}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl8}`);
  }


  getTanksQteLibre(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl3}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl3}`);
  }

  //qte tanks generale d'aujourd'hui
  getTanksQteGenerale(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl4}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl4}`);
  }

  getTanksFiltres(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get(`${this.baseUrl2}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl2}`);
  }

  getTank(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }


  createTank(tank:any){
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.post(this.baseUrl,tank,{headers:httpHeaders});
    return this.http.post(this.baseUrl,tank);
  }


  updateTank(id: number, value:any): Observable<Object> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.put(url, value,{headers:httpHeaders});
    return this.http.put(url, value);
  }

  

  deleteTank(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    // return this.http.delete(url,{headers:httpHeaders});
    return this.http.delete(url);
  }

  getTankList(): Observable<Tank[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    // return this.http.get<Tank[]>(this.baseUrl,{headers:httpHeaders});
    return this.http.get<Tank[]>(this.baseUrl);
   
  }
}

