import { Component, ViewEncapsulation } from '@angular/core';
// import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ds-faqs-content',
  templateUrl: './faqs-content.component.html',
  styleUrls: ['./faqs-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
	styles: [
		`
			.card.disabled {
				opacity: 0.5;
			}
			.custom-header::after {
				content: none;
			}
		`,
	],
})
/**
 * Component displaying the contents of the Privacy Statement
 */
export class FAQsContentComponent {
  disabled = false;
  // constructor(config: NgbAccordionConfig) {
		
	// 	config.closeOthers = true;
	// 	config.type = 'info';
	// }
}
