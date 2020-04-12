import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuySellService } from '../buy-sell.service';
import { BuySell } from '../buy-sell.model';

@Component({
	selector: 'app-edit-ad',
	templateUrl: './edit-ad.component.html',
	styleUrls: [ './edit-ad.component.css' ]
})
export class EditAdComponent implements OnInit {
	errMsg = '';
	id: string;
	item: BuySell;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private db: BuySellService
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		console.log(this.id);
		this.db.getById(this.id).subscribe(
			(data: BuySell) => {
				this.item = data;
				// console.log(data);
			},
			(error: object) => {
				this.errMsg = 'Обявата не може да бъде намерена.';
			}
		);
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
