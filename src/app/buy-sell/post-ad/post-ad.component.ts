import { Component, OnInit } from '@angular/core';
import { BuySellService } from '../buy-sell.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-post-ad',
	templateUrl: './post-ad.component.html',
	styleUrls: [ './post-ad.component.css' ]
})
export class PostAdComponent implements OnInit {
	constructor(private db: BuySellService) {}

	ngOnInit(): void {}

	onPost(f: NgForm) {
		this.db.post(f.value);
	}
}
