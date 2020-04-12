import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { FilteredComponent } from './filtered/filtered.component';
import { UserAdsComponent } from './user-ads/user-ads.component';

const routes: Routes = [
	{ path: '', component: AdsComponent },
	{ path: 'details/:id', component: ItemDetailsComponent },
	{ path: 'edit/:id', component: EditAdComponent },
	{ path: 'post', component: PostAdComponent },
	{ path: 'filtered', component: FilteredComponent },
	{ path: 'user-ads', component: UserAdsComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class BuySellRoutingModule {}
