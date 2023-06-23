import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PasswordLoginComponent } from './authentication/components/password-login/password-login.component';
import { OauthLoginComponent } from './authentication/components/oauth-login/oauth-login.component';
import { AuthenticationComponent } from './authentication/views/authentication/authentication.component';
import { UserService } from './user/services/user.service';
import { AppUserModel } from './authentication/models/app.user.model';

@Component({
	selector: 'kst-root',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		PasswordLoginComponent,
		OauthLoginComponent,
		AuthenticationComponent,
		RouterLink
	],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	protected currentUser: Signal<AppUserModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.currentUser = computed(() => userService.user());
	}
}
