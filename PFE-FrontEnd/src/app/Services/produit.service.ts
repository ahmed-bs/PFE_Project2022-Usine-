import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../Models/produit';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  baseUrl : string = 'http://localhost:3802/produits';
  baseUrl6 : string = 'http://localhost:3802/nbreP';
  baseUrl7 : string = 'http://localhost:3802/qteProduitG';

  // 
  constructor(private http: HttpClient,private authService :AuthService) { }

  getNbProduits(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl6}`);
  }


  getQteProduitsG(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl7}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl7}`);
  }

  getProduits(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl}`);
  }

  getProduit(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
    // return this.http.get(url);
  }

  createProduit(f:Produit):Observable<Produit>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Produit>(this.baseUrl,f,{headers:httpHeaders});
    // return this.http.post<Produit>(this.baseUrl,f);
  }

  updateProduit(id: number, value:Produit): Observable<Object> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
    // return this.http.put(url, value);
  }

  

  deleteProduit(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    // return this.http.delete(url);
 
  }

  getProduitList(): Observable<Produit[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Produit[]>(this.baseUrl,{headers:httpHeaders});
    // return this.http.get<Produit[]>(this.baseUrl);
   
  }
}

