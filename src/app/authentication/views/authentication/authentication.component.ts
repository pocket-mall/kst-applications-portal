import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../user/services/user.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserProfileResponseModel } from '../../../pocket-base/models/user.profile.response.model';

@Component({
	selector: 'kst-authentication',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterOutlet, LoginComponent],
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
	protected userProfile: Signal<UserProfileResponseModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.userProfile = computed(() => userService.userProfile());
	}
}
