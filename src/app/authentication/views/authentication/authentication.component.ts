import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../user/services/user.service';
import { UserResponseModel } from '../../../pocket-base/models/user.response.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'kst-authentication',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterOutlet, LoginComponent],
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
	protected user: Signal<UserResponseModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.user = computed(() => userService.user());
	}
}
