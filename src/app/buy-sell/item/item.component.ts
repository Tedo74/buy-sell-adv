import { Component, OnInit, Input } from '@angular/core';
import { BuySell } from '../buy-sell.model';
import { BuySellService } from '../buy-sell.service';
import { Router } from '@angular/router';
// import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
	@Input() item: BuySell;
	constructor(private db: BuySellService, private router: Router) {}

	ngOnInit(): void {}

	// state = 'normal';

	@Input() singleItem: BuySell;

	getDetails() {
		// this.adv.selectedItem = this.singleItem;
		// this.router.navigate([ '/details' ]);
		this.router.navigate([ '/details', this.singleItem.id ]);
	}
}
