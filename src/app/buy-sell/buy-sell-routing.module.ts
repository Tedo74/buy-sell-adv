import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { PostAdComponent } from './post-ad/post-ad.component';

const routes: Routes = [
	{ path: '', component: AdsComponent },
	{ path: 'post', component: PostAdComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class BuySellRoutingModule {}
