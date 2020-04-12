import { Component, OnInit, Input } from '@angular/core';
import { BuySell } from '../buy-sell.model';
import { BuySellService } from '../buy-sell.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
	@Input() tobeFiltered: BuySell[] = [];
	filtered = [];
	hasSearchError = false;

	constructor(private db: BuySellService, private router: Router) {}

	ngOnInit() {}

	onSearch(searchWord: string) {
		if (searchWord) {
			this.filtered = this.tobeFiltered.filter((product) =>
				product.name.toLowerCase().includes(searchWord.toLowerCase())
			);
			this.db.filteredAds = this.filtered;
			this.router.navigate([ '/ads/filtered' ]);
		} else {
			this.hasSearchError = true;
			setTimeout(() => {
				this.hasSearchError = false;
			}, 2000);
		}
	}
}
