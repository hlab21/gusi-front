import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { HttpBackend } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  private dataIndiv: { name: any; value: any };
  constructor(private http: HttpClient, private httpBackend: HttpBackend) {}

  callWithoutInterceptorCity(): Observable<any> {
    return this.httpBackend
      .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/linechart/activeUsers'));
  }
}
