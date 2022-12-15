import { Component, Inject} from '@angular/core';
import { SiteStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/site-statistics-page/site-statistics-page.component';
import { StatisticsPageComponent } from '../../../../../app/statistics-page/statistics-page/statistics-page.component';
import { SiteDataService } from '../../../../../app/core/data/site-data.service';
import { UsageReportDataService } from '../../../../../app/core/statistics/usage-report-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from '../../../../../app/core/shared/site.model';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';
import {map, switchMap} from 'rxjs/operators';
import { AuthService } from '../../../../../app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { GAService } from './services/ga.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {BarComponent} from './bar/bar.component';
import {PieComponent} from './pie/pie.component';
interface City{
  // country:any;
  city: any;

}
@Component({
  selector: 'ds-site-statistics-page',

  styleUrls: ['./site-statistics-page.component.scss'],
  // styleUrls: ['../../../../../app/statistics-page/site-statistics-page/site-statistics-page.component.scss'],
  templateUrl: './site-statistics-page.component.html',
  // templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html'
})
export class SiteStatisticsPageComponent extends StatisticsPageComponent<Site> {
  barisLoading;
  pieisLoading;
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  ActiveViewers = undefined;
  ScreenPageViews = undefined;
  Sessions = undefined;

  ActiveViewersLM = undefined;
  ScreenPageViewsLM = undefined;
  SessionsLM = undefined;
  // arr: [] = [];
  RealtimeResIndiv = undefined;
  RealtimeRes: any[] = [];
  RealTimeCity = undefined;
  RealTimeCountry = undefined;
  RealTimeCityUsers = undefined;

  // CityUsers: any [] = [];

  constructor(

    protected route: ActivatedRoute,
    protected gaservice: GAService,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected siteService: SiteDataService,
    protected authService: AuthService,

    @Inject(DOCUMENT) document: Document

  ) {
    super(
      route,
      router,
      usageReportService,
      nameService,
      authService,
    );
    this.ngOnInit();
  }
  ngOnInit() {
    this.getActualData28daysAgo();
    this.getActualDataLastMonth();
    this.getRealtime();
    // this.barisLoading =  this.gaservice.getBarisLoading();
    // this.pieisLoading =  this.gaservice.getPieisLoading();
    super.ngOnInit();
  }
  getPercentage(oldval: number, newval: number) {
    return ((newval - oldval) / oldval) * 100;
  }
  getRealtime(){
    this.gaservice.callWithoutInterceptorRealTime().subscribe(
      (response) => {
        if (response.body.rows){
          response.body.rows.forEach(row => {
            this.RealtimeRes.push(row);
          });
        }
      });
  }
  getActualDataLastMonth(){
    this.gaservice.callWithoutInterceptorlastmonth().subscribe(
      (response) =>{
        this.ActiveViewersLM = response.body[0].value;
        this.ScreenPageViewsLM = response.body[1].value;
        this.SessionsLM = response.body[2].value;
      });
  }
  getActualData28daysAgo(){
    this.gaservice.callWithoutInterceptor28daysago().subscribe(
      (response) =>{
        this.ActiveViewers = response.body[0].value;
        this.ScreenPageViews = response.body[1].value;
        this.Sessions = response.body[2].value;
      });
  }

  protected getScope$() {
    return this.siteService.find();
  }
  protected getReports$() {
    return this.scope$.pipe(
      switchMap((scope) =>
        this.usageReportService.searchStatistics(scope._links.self.href, 0, 10),
      ),
    );
  }
}

