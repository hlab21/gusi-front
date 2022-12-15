import { Component } from '@angular/core';
import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { FAQsComponent } from './faqs.component';

/**
 * Themed wrapper for PrivacyComponent
 */
@Component({
  selector: 'ds-themed-faqs',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
})
export class ThemedFAQsComponent extends ThemedComponent<FAQsComponent> {
  protected getComponentName(): string {
    return 'FAQsComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/info/faqs/faqs.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./faqs.component`);
  }

}
