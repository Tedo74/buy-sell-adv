import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BuySellModule } from './buy-sell/buy-sell.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
		LandingPageComponent,
		NavigationComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		BuySellModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
