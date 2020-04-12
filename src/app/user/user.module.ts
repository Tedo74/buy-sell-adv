import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

@NgModule({
	declarations: [ RegisterComponent, LoginComponent, UserPanelComponent ],
	imports: [ CommonModule, UserRoutingModule, AngularFireAuthModule, FormsModule ]
})
export class UserModule {}
