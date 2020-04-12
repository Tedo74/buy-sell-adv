import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BuySellService } from '../buy-sell.service';
import { BuySell } from '../buy-sell.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: [ './item-details.component.css' ]
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
	errorSubscription: Subscription;
	getByIdSubscription: Subscription;
	idSubscription: Subscription;
	errMsg = '';
	//selectedItem: BuySell;
	id = '';
	selectedItem: BuySell;
	nikSubscription: Subscription;
	nikname = '';
	userMatch = false;
	comments: string[] = [];
	@ViewChild('commentInput') commentInput: ElementRef;

	// public get selectedItem(): BuySell {
	// return this.adv.selectedItem;
	// }

	constructor(
		private db: BuySellService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.errorSubscription = this.authService.errorMessageChange.subscribe((err) => {
			this.errMsg = err;
		});

		// this.id = this.route.snapshot.params['id'];
		this.idSubscription = this.route.params.subscribe((p) => {
			this.id = p.id;
			this.getItem(this.id);
		});

		this.nikSubscription = this.authService.nikChange.subscribe((nik) => {
			this.nikname = nik;
		});
	}

	getItem(id: string) {
		if (id) {
			this.getByIdSubscription = this.db.getById(id).subscribe((data: BuySell) => {
				this.selectedItem = data;

				if (data.comments) {
					this.comments = data.comments;
				}
				let user = this.authService.adsUserId();
				//get logged user
				if (user === this.selectedItem.userId) {
					//if user is creator show edit and delete buttons in tmplate
					this.userMatch = true;
				} else {
					this.userMatch = false;
				}
				this.nikname = this.authService.getUserNik();
			});
		}
	}

	ngOnDestroy() {
		this.nikSubscription.unsubscribe();
		this.errorSubscription.unsubscribe();
		this.getByIdSubscription.unsubscribe();
		this.idSubscription.unsubscribe();
	}

	pushComment(comment: string) {
		// console.log(comment);
		if (comment) {
			comment = this.nikname + ': ' + comment;
			this.comments.push(comment);
			this.commentInput.nativeElement.value = '';
			let id = this.selectedItem.id;
			let userId = this.selectedItem.userId;
			this.selectedItem.comments = this.comments;
			let data = { ...this.selectedItem, id, userId };
			this.db.edit(id, data);
		}
	}

	redirect() {
		this.router.navigate([ '/ads/edit', this.id ]);
	}

	delete() {
		let id = this.id;
		let user = this.authService.adsUserId();
		if (user !== this.authService.adsUserId()) {
			this.router.navigate([ '/user/login' ]);
			return;
		}
		this.router.navigate([ '/ads' ]);
		this.db.delete(id);
		// this.adv.getAllAds();

		// return;
	}
}
