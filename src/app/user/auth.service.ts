import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BuySellService } from '../buy-sell/buy-sell.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	errorMessageChange = new Subject<string>();
	errMsg = '';
	private isUserAuth = false;
	authChange = new Subject<boolean>();
	private userId: string;
	private userEmail: string;
	private userNik: string;
	nikChange = new Subject<string>();

	constructor(
		private authService: AngularFireAuth,
		private router: Router,
		private db: BuySellService
	) {}

	private authSuccessfully() {
		this.isUserAuth = true;
		this.authChange.next(true);
	}

	isAuth(): boolean {
		return this.isUserAuth;
	}

	register(email: string, password: string, userName: string) {
		this.authService
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				this.authSuccessfully();
				result.user
					.updateProfile({ displayName: userName, photoURL: '' })
					.then((r) => {
						this.userEmail = result.user.email;
						this.userId = result.user.uid;
						this.userNik = result.user.displayName;
						this.nikChange.next(this.userNik);
					})
					.catch((err) => console.log(err));
				this.errMsg = undefined;
				this.errorMessageChange.next(this.errMsg);
				this.router.navigate([ '/ads' ]);
			})
			.catch((err) => {
				this.errMsg = err.message;
				this.errorMessageChange.next(this.errMsg);
				this.authChange.next(false);
				this.isUserAuth = false;
			});
	}

	login(email: string, password: string) {
		this.authService
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.authSuccessfully();
				console.log('Login uid ', result.user.displayName);
				this.userEmail = result.user.email;
				this.userId = result.user.uid;
				this.userNik = result.user.displayName;
				this.nikChange.next(this.userNik);
				this.errMsg = undefined;
				this.errorMessageChange.next(this.errMsg);
				this.router.navigate([ '/ads' ]);
			})
			.catch((err) => {
				this.errMsg = err.message;
				this.errorMessageChange.next(this.errMsg);
				this.authChange.next(false);
				this.isUserAuth = false;
			});
	}

	logOut() {
		this.db.cancelSubscriptions();
		this.authService.signOut();
		this.isUserAuth = false;
		this.authChange.next(false);
		this.router.navigate([ '/user/login' ]);
		this.userNik = '';
		this.nikChange.next(this.userNik);
	}

	private setUserNik(mail: string): void {
		if (!this.userNik && this.userEmail) {
			let u = mail.split('@')[0];
			this.userNik = u.trim();
			this.nikChange.next(this.userNik);
		}
	}
	getUserNik(): string {
		return this.userNik;
	}
	adsUserId() {
		return this.userEmail + this.userId.substring(0, 6);
	}
}
