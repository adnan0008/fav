import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
isLoggedIn : boolean = false;



    get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  constructor(private http: HttpClient) {}

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`, options);
  }

  post(endpoint: string, data?, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, options);
  }

  postVariable(endpoint: string, data?) {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}${endpoint}`, data, options);
  }

  patch(endpoint: string, data, options?): Observable<any> {
    return this.http.patch(`${this.apiUrl}${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}${endpoint}`, options);
  }

serLoggerInUser(value: boolean){
    this.isLoggedIn = value;
}
  isUserLoggedIn():boolean{
      return this.isLoggedIn ;
  }
}
