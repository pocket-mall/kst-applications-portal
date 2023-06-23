import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordLoginComponent } from '../../components/password-login/password-login.component';
import { OauthLoginComponent } from '../../components/oauth-login/oauth-login.component';
import { UserService } from '../../../user/services/user.service';
import { AppUserModel } from '../../models/app.user.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'kst-authentication',
	standalone: true,
	imports: [CommonModule, PasswordLoginComponent, OauthLoginComponent, RouterLink, RouterOutlet, LoginComponent],
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
	protected user: Signal<AppUserModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.user = computed(() => userService.user());
	}
}
