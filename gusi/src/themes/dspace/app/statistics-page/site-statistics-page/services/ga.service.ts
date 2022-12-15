import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { HttpBackend } from '@angular/common/http';
import {Observable} from 'rxjs';
import {BarComponent} from '../bar/bar.component';
import {PieComponent} from '../pie/pie.component';
// const httpOptions = {

@Injectable({
  providedIn: 'root'
})
export class GAService {
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    // private pie: PieComponent,
    // private bar: BarComponent
  ) {}

    callWithoutInterceptor7daysago(): Observable<any> {
      return this.httpBackend
        .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/7daysago'));
    }
    callWithoutInterceptor28daysago(): Observable<any> {
      return this.httpBackend
        .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/28daysago'));
    }
    callWithoutInterceptorlastmonth(): Observable<any> {
      return this.httpBackend
        .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/lastmonth'));
    }
  callWithoutInterceptorRealTime(): Observable<any> {
    return this.httpBackend
      .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/realtime/activeusers'));
  }
  callWithoutInterceptorCity(): Observable<any> {
    return this.httpBackend.handle(
      new HttpRequest(
        'GET',
        'https://coe.repository-uecal.com/stats/ga1/city-pie'
      )
    );
  }
  // getBarisLoading(){
  //   return this.bar.isLoading;
  // }
  //
  // getPieisLoading(){
  //   return this.pie.isLoading;
  // }
}
