import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
	isAuth = false;
	nikname = '';
	authSubscription: Subscription;
	nikSubscription: Subscription;
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
			this.isAuth = authStatus;
		});
		this.nikSubscription = this.authService.nikChange.subscribe((nikname) => {
			this.nikname = nikname;
		});
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
		this.nikSubscription.unsubscribe();
	}

	logout() {
		this.authService.logOut();
		this.isAuth = false;
		// this.nikname = '';
		// this.router.navigate([ '/' ]);
	}

	user() {
		this.router.navigate([ '/user/panel' ]);
	}
}
