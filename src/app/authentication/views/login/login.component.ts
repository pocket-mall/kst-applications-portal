import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordLoginComponent } from '../../components/password-login/password-login.component';
import { OauthLoginComponent } from '../../components/oauth-login/oauth-login.component';
import { Provider } from '../../enums/provider';
import { AppUserModel } from '../../models/app.user.model';
import { UserService } from '../../../user/services/user.service';

@Component({
	selector: 'kst-login',
	standalone: true,
	imports: [CommonModule, PasswordLoginComponent, OauthLoginComponent],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	protected readonly googleOAuthProvider: Provider = Provider.Google;
	protected user: Signal<AppUserModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.user = computed(() => userService.user());
	}

	protected handleLoggedInUser(appUser: AppUserModel): void {
		this.userService.user.set(appUser);
	}
}
