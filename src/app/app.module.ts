import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
