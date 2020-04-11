import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: LandingPageComponent },
	{
		path: 'home',
		component: HomeComponent
		// canActivate: [ AuthGuard ]
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
