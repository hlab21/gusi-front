import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageComponent } from './home-page.component';
import { TopLevelCommunityListComponent } from './top-level-community-list/top-level-community-list.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { ThemedHomeNewsComponent } from './home-news/themed-home-news.component';
import { ThemedHomePageComponent } from './themed-home-page.component';
import { RecentItemListComponent } from './recent-item-list/recent-item-list.component';
import { JournalEntitiesModule } from '../entity-groups/journal-entities/journal-entities.module';
import { ResearchEntitiesModule } from '../entity-groups/research-entities/research-entities.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowseByModule } from '../browse-by/browse-by.module';
import { BrowseByPageModule } from '../browse-by/browse-by-page.module';
import { BrowseBySwitcherComponent } from '../browse-by/browse-by-switcher/browse-by-switcher.component';
import { BrowseByTitlePageComponent } from '../browse-by/browse-by-title-page/browse-by-title-page.component';
import { BrowseByDatePageComponent } from '../browse-by/browse-by-date-page/browse-by-date-page.component';
import { BrowseByMetadataPageComponent } from '../browse-by/browse-by-metadata-page/browse-by-metadata-page.component';
const DECLARATIONS = [
  HomePageComponent,
  ThemedHomePageComponent,
  TopLevelCommunityListComponent,
  ThemedHomeNewsComponent,
  HomeNewsComponent,
  RecentItemListComponent,
  // BrowseBySwitcherComponent,
  // BrowseByTitlePageComponent,
  // BrowseByDatePageComponent,
  // BrowseByMetadataPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.withEntryComponents(),
    JournalEntitiesModule.withEntryComponents(),
    ResearchEntitiesModule.withEntryComponents(),
    HomePageRoutingModule,
    StatisticsModule.forRoot(),
    NgbModule,
    // BrowseByModule,
    // BrowseByPageModule
    
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class HomePageModule {

}
