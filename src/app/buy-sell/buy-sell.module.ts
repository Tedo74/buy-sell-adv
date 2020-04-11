import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BuySellRoutingModule } from './buy-sell-routing.module';
import { AdsComponent } from './ads/ads.component';
import { ItemComponent } from './item/item.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';

@NgModule({
	declarations: [ AdsComponent, ItemComponent, PostAdComponent, EditAdComponent ],
	imports: [ CommonModule, FormsModule, BuySellRoutingModule ],
	exports: [ AdsComponent ]
})
export class BuySellModule {}