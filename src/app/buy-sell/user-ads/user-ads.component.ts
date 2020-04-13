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
	userId: string;

	constructor(
		private authService: AuthService,
		private db: BuySellService,
		private router: Router
	) {}

	ngOnInit() {
		this.errorSubscription = this.db.dbErrorMsgChanged.subscribe((err) => {
			this.errMsg = err;
		});
		this.userId = this.authService.adsUserId();

		this.db.getWishList(this.userId);
		this.wishlistIds = this.db.userWishlist;
		this.wishesSubscription = this.db.userWishlistChanged.subscribe((w) => {
			this.wishlistIds = w;
			this.getWishListed();
		});

		this.myItems = this.db.allAds.filter((i: BuySell) => {
			if (i.userId === this.userId) {
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
		this.wishlisted = [];
		let allAds = this.db.allAds;
		let notFound = [];

		if (this.wishlistIds) {
			for (let i = 0; i < this.wishlistIds.length; i++) {
				let isFound = false;
				for (let x = 0; x < allAds.length; x++) {
					if (this.wishlistIds[i] === allAds[x].id) {
						this.wishlisted.push(allAds[x]);
						isFound = true;
						break;
					}
				}
				if (!isFound) {
					notFound.push(this.wishlistIds[i]);
				}
			}

			if (notFound) {
				// console.log('notFound', notFound);
				let wl = [ ...this.wishlistIds ];
				// console.log('wl before', wl);

				for (let i = 0; i < notFound.length; i++) {
					wl = wl.filter((currId) => {
						return currId !== notFound[i];
					});
				}
				// console.log('wl after', wl);

				this.db.editWishlist(this.userId, wl);
			}
		}
	}
}
