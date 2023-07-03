import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordLoginComponent } from '../../components/password-login/password-login.component';
import { Provider } from '../../enums/provider';
import { UserResponseModel } from '../../../pocket-base/models/user.response.model';
import { UserService } from '../../../user/services/user.service';
import { OauthLoginComponent } from '../../components/oauth-login/oauth-login.component';

@Component({
	selector: 'kst-login',
	standalone: true,
	imports: [CommonModule, PasswordLoginComponent, OauthLoginComponent],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	protected readonly googleOAuthProvider: Provider = Provider.Google;
	protected user: Signal<UserResponseModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.user = computed(() => userService.user());
	}

	protected handleLoggedInUser(appUser: UserResponseModel): void {
		this.userService.user.set(appUser);
	}
}
