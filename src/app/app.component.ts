import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationComponent } from './authentication/views/authentication/authentication.component';
import { UserService } from './user/services/user.service';
import { UserResponseModel } from './pocket-base/models/user.response.model';

@Component({
	selector: 'kst-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, AuthenticationComponent, RouterLink],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	protected currentUser: Signal<UserResponseModel | undefined>;

	constructor(private readonly userService: UserService) {
		this.currentUser = computed(() => userService.user());
	}
}
