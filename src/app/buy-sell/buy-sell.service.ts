import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuySell } from './buy-sell.model';

@Injectable({
	providedIn: 'root'
})
export class BuySellService {
	allAds = <BuySell[]>[];
	allAdsChanged = new Subject<BuySell[]>();

	constructor(private db: AngularFirestore) {}

	getAllAds() {
		this.db
			.collection('adv')
			.snapshotChanges()
			.pipe(
				map((d) => {
					return d.map((snap) => {
						let data: Object = snap.payload.doc.data();
						console.log(d);
						return <BuySell>{ id: snap.payload.doc.id, ...data };
					});
				})
			)
			.subscribe((d) => {
				this.allAds = d;
				this.allAdsChanged.next(this.allAds);
			});
	}

	post(item: BuySell) {
		this.db.collection('adv').add(item).then((docRef) => {
			console.log('Document written with ID: ', docRef.id);
		});
	}

	edit(id: string, changes: Partial<BuySell>) {
		this.db.doc(`adv/${id}`).update(changes);
	}

	delete(id: string) {
		this.db
			.collection('adv')
			.doc(id)
			.delete()
			.then((d) => {
				console.log(id + 'deleted');
			})
			.catch((err) => console.log(err));
	}
}
