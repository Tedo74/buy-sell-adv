import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: LandingPageComponent },
	{
		path: 'ads',
		loadChildren: () =>
			import('./buy-sell/buy-sell.module').then((m) => m.BuySellModule),
		canActivate: [ AuthGuard ]
	},
	{
		path: 'user',
		loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: [ AuthGuard ]
})
export class AppRoutingModule {}
