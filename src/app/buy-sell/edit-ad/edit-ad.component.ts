import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuySellService } from '../buy-sell.service';
import { BuySell } from '../buy-sell.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-ad',
	templateUrl: './edit-ad.component.html',
	styleUrls: [ './edit-ad.component.css' ]
})
export class EditAdComponent implements OnInit, OnDestroy {
	errMsg = '';
	id: string;
	item: BuySell;
	errorSubscription: Subscription;
	getByIdSubscription: Subscription;
	// paramsSubscription: Subscription;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private db: BuySellService
	) {}

	ngOnInit() {
		this.errorSubscription = this.db.dbErrorMsgChanged.subscribe((err) => {
			this.errMsg = err;
		});
		this.id = this.route.snapshot.params['id'];
		if (this.id) {
			this.getById(this.id);
		} else {
			this.db.dbErrorMsg = 'Обявата не може да бъде намерена.';
		}

		// this.paramsSubscription = this.route.params.subscribe((p) => {
		// 	this.id = p.id;
		// 	this.getById(this.id);
		// });
	}
	getById(id: string) {
		this.getByIdSubscription = this.db.getById(id).subscribe(
			(data: BuySell) => {
				this.item = data;
				// console.log(data);
			},
			(error: object) => {
				this.db.dbErrorMsg = 'Обявата не може да бъде намерена.';
			}
		);
	}

	ngOnDestroy(): void {
		this.errorSubscription.unsubscribe();
		this.getByIdSubscription.unsubscribe();
		// this.paramsSubscription.unsubscribe();
	}

	onEdit(f: NgForm) {
		let id = this.item.id;
		let userId = this.item.userId;
		let comments = this.item.comments;
		let data = { ...f.value, comments, userId };
		this.router.navigate([ '/ads' ]);
		this.db.edit(id, data);
	}
}
