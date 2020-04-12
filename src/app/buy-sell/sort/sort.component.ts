import { Component, OnInit, Input } from '@angular/core';
import { BuySell } from '../buy-sell.model';

@Component({
	selector: 'app-sort',
	templateUrl: './sort.component.html',
	styleUrls: [ './sort.component.css' ]
})
export class SortComponent implements OnInit {
	@Input() toBeSorted = <BuySell[]>[];
	constructor() {}

	ngOnInit(): void {}

	onSortDesc() {
		this.toBeSorted.sort((a, b) => {
			if (a.price > b.price) {
				return -1;
			}
			if (a.price < b.price) {
				return 1;
			}
			return 0;
		});
	}
	onSortAsc() {
		this.toBeSorted.sort((a: BuySell, b: BuySell) => {
			if (a.price > b.price) {
				return 1;
			}
			if (a.price < b.price) {
				return -1;
			}
			return 0;
		});
	}
}
