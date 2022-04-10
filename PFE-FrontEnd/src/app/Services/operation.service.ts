import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';


@Injectable({
  providedIn: 'root'
})
export class OperationService {
  baseUrl : string = 'http://localhost:3802/operations';
  baseUrl1 : string = 'http://localhost:3802/retrait';
  baseUrl2 : string = 'http://localhost:3802/remplissage';
  baseUrl3 : string = 'http://localhost:3802/operationsRetrait';
  baseUrl4 : string = 'http://localhost:3802/operationsRemplissages';
  baseUrl5 : string = 'http://localhost:3802/operationsTank';
  baseUrl6 : string = 'http://localhost:3802/nbreOp';
  baseUrl7 : string = 'http://localhost:3802/operationsR';
  baseUrl8 : string = 'http://localhost:3802/getOpTank';
  // ,private authService :AuthService
  constructor(private http: HttpClient) { }


  getNbOp(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl6}`);
  }



  getOperations(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl}`);
  }

  getOperationsRemplissages(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl4}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl4}`);
  }

  getOperationsRetraits(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl3}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl3}`);
  }

  getOperationsTanks(): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl5}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl5}`);
  }

  getOperation(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }


  getOpTank(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl8}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }


  getOperationTank(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl5}/${id}`
    // return this.http.get(url,{headers:httpHeaders});
    return this.http.get(url);
  }

  createOperation(f:any){
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.post(this.baseUrl1,f,{headers:httpHeaders});
    return this.http.post(this.baseUrl1,f);
  }

  createOperationRemplissage(f:any){
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.post(this.baseUrl2,f,{headers:httpHeaders});
    return this.http.post(this.baseUrl2,f);
  }

  updateOperation(id: number, value:any) {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl}/${id}`
    // return this.http.put(url, value,{headers:httpHeaders});
    return this.http.put(url, value);
  }

  updateOperationR(id: number, value:any) {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl7}/${id}`
    // return this.http.put(url, value,{headers:httpHeaders});
    return this.http.put(url, value);
  }



  deleteOperation(id: number): Observable<any> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})

    const url = `${this.baseUrl}/${id}`
    // return this.http.delete(url,{headers:httpHeaders});
    return this.http.delete(url);
  }

  getOperationList(): Observable<Operation[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get<Operation[]>(this.baseUrl,{headers:httpHeaders});
    return this.http.get<Operation[]>(this.baseUrl);
  }
}
