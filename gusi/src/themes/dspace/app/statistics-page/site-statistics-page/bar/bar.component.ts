import { Component,Inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {BarService} from './services/bar.service';
@Component({
  selector: 'ds-bar-page',
  styleUrls: ['./bar.component.scss'],
  templateUrl: './bar.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class BarComponent {
  single = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        }
      ]
    },

    {
      'name': 'USA',
      'series': [
        {
          'name': '2010',
          'value': 7870000
        },
        {
          'name': '2011',
          'value': 8270000
        }
      ]
    }
  ];
  dataIndiv;
  isLoading = true;
  colorScheme = {
    domain: []
  };
  bar: any[] = [];
  viewlg: any[] = [500, 350];
  viewmd: any[] = [500, 400];
  viewxxs: any[] = [250, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showGridLines = true;
  legendPosition = 'right';
  xAxisLabel = 'City';
  showYAxisLabel = true;
  yAxisLabel = 'Active Users';

  constructor(private http: BarService) {
  }
  ngOnInit(){
    this.getActualDataCity();
  }
  getActualDataCity(){
    this.http.callWithoutInterceptorCity().subscribe(
      (response) =>{
        if (response.body){
          this.bar = response.body;
          response.body.forEach(row => {
            this.colorScheme.domain.push(this.randomColor());
          });
          this.isLoading = false;
        }
      }
    );
  }
  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  onSelect(event) {
    console.log(event);
  }
}

