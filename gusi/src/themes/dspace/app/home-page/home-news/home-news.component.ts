import { Component } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  providers: [NgbCarouselConfig],
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {
  showNavigationArrows = false;
	showNavigationIndicators = false;
  images = [3, 2, 1].map((n) => `assets/gusi/images/homepage-${n}.jpg`);
}

