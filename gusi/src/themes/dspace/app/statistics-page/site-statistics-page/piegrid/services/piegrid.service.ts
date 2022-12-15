import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { HttpBackend } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PiegridService {
  private dataIndiv: { name: any; value: any };
  constructor(private http: HttpClient, private httpBackend: HttpBackend) {}

  callWithoutInterceptorCity(): Observable<any> {
    return this.httpBackend
      .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/Sessions-city'));
  }
  // callWithoutInterceptorCity(): Observable<any> {
  //   return this.httpBackend
  //     .handle(new HttpRequest('GET', 'https://coe.repository-uecal.com/stats/ga1/city-pie'));
  // }
  // getActualDataCity(){
  //   this.callWithoutInterceptorCity().subscribe(
  //     (response) =>{
  //       if (response.body){
  //         response.body.forEach(row => {
  //           this.dataIndiv = {name: row.dimensionValues[1].value, value: row.metricValues[0].value};
  //           this.single.push(this.dataIndiv);
  //         });
  //         console.log(this.multi);
  //         console.log(this.single);
  //       }
  //     }
  //   );
  // }

}
