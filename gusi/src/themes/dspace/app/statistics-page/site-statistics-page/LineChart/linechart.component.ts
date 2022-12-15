import { Component,Inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {LineChartService} from './services/linechart.service';
@Component({
  selector: 'ds-linechart-page',
  styleUrls: ['./linechart.component.scss'],
  templateUrl: './linechart.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class LineChartComponent{
  isLoading = true;
  dataIndiv;
  linechart: any[] = [];
  viewlg: any[] = [750, 550];
  viewmd: any[] = [600, 400];
  viewxxs: any[] = [450, 250];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  yAxisLabel = 'Active Users';
  timeline = true;
  colorScheme = {
    domain: []
  };

  constructor( private http: LineChartService) {
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
          this.linechart = response.body;
          this.isLoading = false;
        }
      }
    );
  }
  onSelect(event) {
    console.log(event);
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

