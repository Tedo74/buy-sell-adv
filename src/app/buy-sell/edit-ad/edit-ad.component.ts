import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-edit-ad',
	templateUrl: './edit-ad.component.html',
	styleUrls: [ './edit-ad.component.css' ]
})
export class EditAdComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	onEdit(f: NgForm) {}
}
