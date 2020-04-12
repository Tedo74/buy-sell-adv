import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { BuySellService } from '../buy-sell.service';

@Component({
	selector: 'app-post-ad',
	templateUrl: './post-ad.component.html',
	styleUrls: [ './post-ad.component.css' ]
})
export class PostAdComponent implements OnInit {
	errorSubscription: Subscription;
	errMsg = '';
	category = 'sell';
	constructor(
		private authService: AuthService,
		private db: BuySellService,
		private router: Router
	) {}

	ngOnInit() {
		this.errorSubscription = this.authService.errorMessageChange.subscribe((err) => {
			this.errMsg = err;
		});
	}
	ngOnDestroy() {
		this.errorSubscription.unsubscribe();
	}

	onPost(f: NgForm) {
		let userId = this.authService.adsUserId();
		let comments = [ 'comments:' ];
		let item = { ...f.value, userId, comments };
		this.db.post(item);
	}
}
