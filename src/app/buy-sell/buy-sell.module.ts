import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BuySellRoutingModule } from './buy-sell-routing.module';
import { AdsComponent } from './ads/ads.component';
import { ItemComponent } from './item/item.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SearchComponent } from './search/search.component';
import { FilteredComponent } from './filtered/filtered.component';
import { SortComponent } from './sort/sort.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AdsComponent,
		ItemComponent,
		PostAdComponent,
		EditAdComponent,
		ItemDetailsComponent,
		SearchComponent,
		FilteredComponent,
		SortComponent
	],
	imports: [ CommonModule, FormsModule, BuySellRoutingModule ],
	exports: [ AdsComponent ]
})
export class BuySellModule {}
