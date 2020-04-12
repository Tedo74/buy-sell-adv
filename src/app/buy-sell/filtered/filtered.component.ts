import { Component, OnInit } from '@angular/core';
import { BuySellService } from '../buy-sell.service';
import { BuySell } from '../buy-sell.model';

@Component({
	selector: 'app-filtered',
	templateUrl: './filtered.component.html',
	styleUrls: [ './filtered.component.css' ]
})
export class FilteredComponent implements OnInit {
	public get filteredAds(): BuySell[] {
		return this.buySell.filteredAds;
	}
	public get allAds(): BuySell[] {
		return this.buySell.allAds;
	}
	constructor(private buySell: BuySellService) {}

	ngOnInit() {}
}
