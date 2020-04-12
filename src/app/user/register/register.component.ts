import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit, OnDestroy {
	passCheck = false;
	regErrorMessge: string;
	errorSubscription: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.errorSubscription = this.authService.errorMessageChange.subscribe((err) => {
			this.regErrorMessge = err;
		});
	}

	ngOnDestroy(): void {
		this.errorSubscription.unsubscribe();
	}

	onReg(f: NgForm) {
		this.check(f.value.password, f.value.passConfirm);
		if (!this.passCheck) {
			// console.log(f.value.password, f.value.passConfirm, 'not mach');
			return;
		} else {
			let email: string = f.value.email;
			let pass: string = f.value.password;
			let userName: string = f.value.user;
			this.authService.register(email, pass, userName);
		}
	}

	check(pass: string, passConfirm: string) {
		if (pass === passConfirm) {
			this.passCheck = true;
		} else {
			this.passCheck = false;
		}
		// console.log(pass, passConfirm, this.passCheck);
	}
}
