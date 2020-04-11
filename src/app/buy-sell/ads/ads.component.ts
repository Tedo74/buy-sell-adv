import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuySellService } from '../buy-sell.service';
import { Subscription } from 'rxjs';
import { BuySell } from '../buy-sell.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-ads',
	templateUrl: './ads.component.html',
	styleUrls: [ './ads.component.css' ]
})
export class AdsComponent implements OnInit, OnDestroy {
	allAds: BuySell[];
	adsSubscription: Subscription;
	constructor(private db: BuySellService) {}

	ngOnInit(): void {
		this.db.getAllAds();
		// this.allAds = this.db.allAds;
		this.adsSubscription = this.db.allAdsChanged.subscribe((d) => {
			this.allAds = d;
		});
	}

	ngOnDestroy(): void {
		this.adsSubscription.unsubscribe();
	}
}
