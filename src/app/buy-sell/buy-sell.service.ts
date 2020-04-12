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
	dbErrorMsg: string;
	dbErrorMsgChanged = new Subject<string>();
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
				.subscribe(
					(d) => {
						this.allAds = d;
						this.allAdsChanged.next(this.allAds);
					},
					(err) => {
						this.dbErrorMsg = 'Грешка при четене от база данни.';
						this.dbErrorMsgChanged.next(this.dbErrorMsg);
					}
				)
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
			.catch((err) => {
				this.dbErrorMsg = 'Грешка при публикуване в база данни.';
				this.dbErrorMsgChanged.next(this.dbErrorMsg);
			});
	}

	edit(id: string, changes: Partial<BuySell>) {
		this.db.doc(`adv/${id}`).update(changes).then((r) => {}).catch((err) => {
			this.dbErrorMsg = 'Грешка при редактиране на данни.';
			this.dbErrorMsgChanged.next(this.dbErrorMsg);
		});
	}

	delete(id: string) {
		this.db.collection('adv').doc(id).delete().then((d) => {}).catch((err) => {
			this.dbErrorMsg = 'Грешка при изтриване на обява от база данни.';
			this.dbErrorMsgChanged.next(this.dbErrorMsg);
		});
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
