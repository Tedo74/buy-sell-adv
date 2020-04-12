import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
	@ViewChild('btn') btn: ElementRef;
	pass: string;
	loginErrorMessge: string;
	errorSubscription: Subscription;
	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.errorSubscription = this.authService.errorMessageChange.subscribe((err) => {
			this.loginErrorMessge = err;
		});
	}

	ngAfterViewInit() {
		this.btn.nativeElement.disabled = true;
	}

	ngOnDestroy() {
		this.errorSubscription.unsubscribe();
	}

	onLogin(f: NgForm) {
		let email = f.value.email;
		let password = f.value.password;
		this.authService.login(email, password);
	}
}
