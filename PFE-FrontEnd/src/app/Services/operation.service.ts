import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
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
  baseUrl9 : string = 'http://localhost:3802/retrait1';
  baseUrl10 : string = 'http://localhost:3802/transf';
  baseUrl11 : string = 'http://localhost:3802/operationsTransf';
  baseUrl12 : string = 'http://localhost:3802/operationsRet';
  baseUrl13 : string = 'http://localhost:3802/operationsTransf';

  baseUrl14 : string = 'http://localhost:3802/nbOpRetrait';
  baseUrl15 : string = 'http://localhost:3802/nbOpRemplissage';
  baseUrl16 : string = 'http://localhost:3802/nbOpTransformation';

  baseUrl17 : string = 'http://localhost:3802/op';





  // 
  constructor(private http: HttpClient,private authService :AuthService) { }


  getNbOp(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
    return this.http.get(`${this.baseUrl6}`,{headers:httpHeaders});
  }


  // test si le code exist ou nn
  getOpCodeUtilise(code: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.baseUrl17}/${code}`
    return this.http.get(url,{headers:httpHeaders});
  }


  getNbOpRetrait(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl14}`,{headers:httpHeaders});
   }


  getNbOpRemplissage(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl15}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl15}`);
  }


  getNbOpTransformation(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl16}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl16}`);
  }



  getOperations(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl}`);
  }

  getOperationsRemplissages(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl4}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl4}`);
  }

  
  getOperationsTransfs(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl11}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl11}`);
  }

  getOperationsRetraits(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl3}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl3}`);
  }

  getOperationsTanks(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get(`${this.baseUrl5}`,{headers:httpHeaders});
    // return this.http.get(`${this.baseUrl5}`);
  }

  getOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url,{headers:httpHeaders});
   
  }


  getOpTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl8}/${id}`
    return this.http.get(url,{headers:httpHeaders});

  }


  getOperationTank(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl5}/${id}`
    return this.http.get(url,{headers:httpHeaders});
    // return this.http.get(url);
  }

  createOperation(f:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post(this.baseUrl9,f,{headers:httpHeaders});
    // return this.http.post(this.baseUrl9,f);
  }

  createOperationTransf(f:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post(this.baseUrl10,f,{headers:httpHeaders});
    // return this.http.post(this.baseUrl10,f);
  }

  createOperationRemplissage(f:any){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post(this.baseUrl2,f,{headers:httpHeaders});
    // return this.http.post(this.baseUrl2,f);
  }

  updateOperation(id: number, value:any) {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
    // return this.http.put(url, value);
  }

  updateOperationR(id: number, value:any) {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.baseUrl7}/${id}`
    return this.http.put(url, value,{headers:httpHeaders});
    // return this.http.put(url, value);
  }



  deleteOperation(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    // return this.http.delete(url);
  }


  deleteOperationR(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    const url = `${this.baseUrl12}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    // return this.http.delete(url);
  }


  
  deleteOperationT(id: number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    const url = `${this.baseUrl13}/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    // return this.http.delete(url);
  }



  getOperationList(): Observable<Operation[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Operation[]>(this.baseUrl,{headers:httpHeaders});
    // return this.http.get<Operation[]>(this.baseUrl);
  }
}
