import { Component,Inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {BrowserOSService} from './services/pie.service';
import {NgbCollapseModule, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ds-browseros-page',
  styleUrls: ['./browser-os.component.scss'],
  templateUrl: './browser-os.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class BrowserOSComponent{
  public isCollapsed = false;
  isLoading = true;
  dataIndiv;
  cardBrowse: any[] = [];
  cardOS: any[] = [];
  cardColor: string = '#232837';
  viewlg: any[] = [350, 450];
  viewmd: any[] = [450, 350];
  viewxxs: any[] = [250, 250];

  colorScheme = {
    domain: []
  };

  constructor( private http: BrowserOSService, config: NgbDropdownConfig) {
    // config.placement = 'top-start';
    config.autoClose = false;
    this.ngOnInit();
  }
  ngOnInit(){
    this.getActualDataCityBrowse();
    this.getActualDataCityOS();
  }
  // getActualDataCity(){
  //   this.http.callWithoutInterceptorCity().subscribe(
  //     (response) =>{
  //       if (response.body){
  //         response.body.forEach(row => {
  //           this.dataIndiv = {name: row.dimensionValues[1].value, value: row.metricValues[1].value};
  //           this.pie.push(this.dataIndiv);
  //           this.dataIndiv = {name: row.dimensionValues[1].value, value: row.metricValues[0].value, extra:{code: row.dimensionValues[2].value}};
  //           // this.bar.push(this.dataIndiv);
  //           this.colorScheme.domain.push(this.randomColor());
  //         });
  //         this.isLoading = false;
  //       }
  //     }
  //   );
  // }
  getActualDataCityBrowse(){
    this.http.callWithoutInterceptorCityBrowser().subscribe(
      (response) =>{
        if (response.body){
          response.body.forEach(row => {
            // this.colorScheme.domain.some()
            this.colorScheme.domain.push(this.randomColor());
          });
          this.cardBrowse = response.body;
          this.isLoading = false;
        }
      }
    );
  }
  getActualDataCityOS(){
    this.http.callWithoutInterceptorCityOS().subscribe(
      (response) =>{
        this.colorScheme = {
          domain: []
        };
        if (response.body){
          response.body.forEach(row => {
            this.colorScheme.domain.push(this.randomColor());
          });
          this.cardOS = response.body;
          this.isLoading = false;
        }
      }
    );
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

