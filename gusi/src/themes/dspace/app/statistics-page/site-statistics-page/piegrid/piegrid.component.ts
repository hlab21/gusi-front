import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {PiegridService} from './services/piegrid.service';
@Component({
  selector: 'ds-piegrid-page',
  styleUrls: ['./piegrid.component.scss'],
  templateUrl: './piegrid.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class PieGridComponent{
  isLoading = true;
  dataIndiv;
  pie: any[] = [];
  viewlg: any[] = [750, 450];
  viewmd: any[] = [600, 350];
  viewxxs: any[] = [250, 250];

  single: any[];


  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: []
  };

  constructor( private http: PiegridService) {
    this.ngOnInit();
  }
  ngOnInit(){
    this.getActualDataCity();
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
  getActualDataCity(){
    this.http.callWithoutInterceptorCity().subscribe(
      (response) =>{
        if (response.body){
          response.body.forEach(row => {
            this.colorScheme.domain.push(this.randomColor());
          });
          this.pie = response.body;
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

