import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuySellService } from '../buy-sell.service';
import { Subscription } from 'rxjs';
import { BuySell } from '../buy-sell.model';

@Component({
	selector: 'app-ads',
	templateUrl: './ads.component.html',
	styleUrls: [ './ads.component.css' ]
})
export class AdsComponent implements OnInit, OnDestroy {
	allAds: BuySell[];
	adsSubscription: Subscription;
	errorSubscription: Subscription;
	errMsg: string;
	constructor(private db: BuySellService) {}

	ngOnInit(): void {
		this.db.getAllAds();
		// this.allAds = this.db.allAds;
		this.adsSubscription = this.db.allAdsChanged.subscribe((d) => {
			this.allAds = d;
		});
		this.errorSubscription = this.db.dbErrorMsgChanged.subscribe((err) => {
			this.errMsg = err;
		});
	}

	ngOnDestroy(): void {
		this.adsSubscription.unsubscribe();
		this.errorSubscription.unsubscribe();
	}
}
