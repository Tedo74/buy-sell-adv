import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuySell } from '../buy-sell.model';
import { AuthService } from 'src/app/user/auth.service';
import { BuySellService } from '../buy-sell.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-ads',
	templateUrl: './user-ads.component.html',
	styleUrls: [ './user-ads.component.css' ]
})
export class UserAdsComponent implements OnInit, OnDestroy {
	errorSubscription: Subscription;
	errMsg = '';
	myItems: BuySell[];
	wishlistIds: string[];
	wishlisted: BuySell[] = [];
	wishesSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private db: BuySellService,
		private router: Router
	) {}

	ngOnInit() {
		this.errorSubscription = this.db.dbErrorMsgChanged.subscribe((err) => {
			this.errMsg = err;
		});
		let user = this.authService.adsUserId();

		this.db.getWishList(user);
		this.wishlistIds = this.db.userWishlist;
		this.wishesSubscription = this.db.userWishlistChanged.subscribe((w) => {
			this.wishlistIds = w;
			this.getWishListed();
		});

		this.myItems = this.db.allAds.filter((i: BuySell) => {
			if (i.userId === user) {
				return true;
			}
			return false;
		});
	}

	ngOnDestroy() {
		this.errorSubscription.unsubscribe();
		this.wishesSubscription.unsubscribe();
	}

	edit(item: BuySell) {
		this.router.navigate([ '/ads/edit', item.id ]);
	}

	delete(item: BuySell) {
		let id = item.id;
		if (item.userId !== this.authService.adsUserId()) {
			this.router.navigate([ '/user/login' ]);
			return;
		}
		this.db.delete(id);
		this.myItems = this.myItems.filter((i) => {
			return i.id !== id;
		});
	}

	getWishListed() {
		let allAds = this.db.allAds;
		console.log(this.wishlistIds);

		if (this.wishlistIds) {
			for (let i = 0; i < this.wishlistIds.length; i++) {
				for (let x = 0; x < allAds.length; x++) {
					if (allAds[x].id === this.wishlistIds[i]) {
						this.wishlisted.push(allAds[x]);
						break;
					}
				}
			}
		}
	}
}
