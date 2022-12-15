import { Component,Inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {PieService} from './services/pie.service';
@Component({
  selector: 'ds-pie-page',
  styleUrls: ['./pie.component.scss'],
  templateUrl: './pie.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class PieComponent{
  isLoading = true;
  dataIndiv;
  pie: any[] = [];
  viewlg: any[] = [450, 350];
  viewmd: any[] = [500, 400];
  viewxxs: any[] = [250, 250];

  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'right';
  colorScheme = {
    domain: []
  };

  constructor(private http: PieService) {
    this.ngOnInit();
  }
  ngOnInit(){
    this.getActualDataCity();
  }
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

