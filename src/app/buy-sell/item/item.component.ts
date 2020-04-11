import { Component, OnInit, Input } from '@angular/core';
import { BuySell } from '../buy-sell.model';
import { BuySellService } from '../buy-sell.service';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
	@Input() item: BuySell;
	constructor(private db: BuySellService) {}

	ngOnInit(): void {}

	delete() {
		this.db.delete(this.item.id);
	}
}
