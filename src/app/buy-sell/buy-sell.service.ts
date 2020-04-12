import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuySell } from './buy-sell.model';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
// import 'firebase/firestore'

@Injectable({
	providedIn: 'root'
})
export class BuySellService {
	allAds = <BuySell[]>[];
	filteredAds = <BuySell[]>[];
	allAdsChanged = new Subject<BuySell[]>();
	allFbSubscriptions: Subscription[] = [];

	constructor(private db: AngularFirestore, private router: Router) {}

	getAllAds() {
		this.allFbSubscriptions.push(
			this.db
				.collection('adv')
				.snapshotChanges()
				.pipe(
					map((d) => {
						return d.map((snap) => {
							let data: Object = snap.payload.doc.data();
							return <BuySell>{ id: snap.payload.doc.id, ...data };
						});
					})
				)
				.subscribe((d) => {
					this.allAds = d;
					this.allAdsChanged.next(this.allAds);
				})
		);
	}

	post(item: BuySell) {
		this.db
			.collection('adv')
			.add(item)
			.then((docRef) => {
				// console.log('Document written with ID: ', docRef.id);
				this.router.navigate([ '/ads' ]);
			})
			.catch((err) => console.log(err));
	}

	edit(id: string, changes: Partial<BuySell>) {
		this.db.doc(`adv/${id}`).update(changes).then((r) => {}).catch((err) => {
			// this.errMsg = 'Грешка';
			console.log(err);
		});
	}

	delete(id: string) {
		this.db
			.collection('adv')
			.doc(id)
			.delete()
			.then((d) => {})
			.catch((err) => console.log(err));
	}

	getById(id: string): Observable<any> {
		return this.db.collection('adv').doc(id).snapshotChanges().pipe(
			map((d) => {
				const data: Object = d.payload.data();
				const id = d.payload.id;
				return { id, ...data };
			})
		);
	}

	cancelSubscriptions() {
		this.allFbSubscriptions.forEach((subs) => subs.unsubscribe());
	}
}
