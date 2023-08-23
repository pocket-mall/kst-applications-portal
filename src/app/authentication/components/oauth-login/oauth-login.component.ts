import { Component, computed, EventEmitter, Input, OnDestroy, Output, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { GoogleLogoComponent } from '../../../common/components/svg-components/google-logo/google-logo.component';
import { Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Provider } from '../../enums/provider';
import { UserResponseModel } from '../../../pocket-base/models/user.response.model';
import { UserService } from '../../../user/services/user.service';
import { UserProfileResponseModel } from '../../../pocket-base/models/user.profile.response.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'kst-oauth-login',
	standalone: true,
	imports: [CommonModule, GoogleLogoComponent],
	templateUrl: './oauth-login.component.html',
	styleUrls: ['./oauth-login.component.scss']
})
export class OauthLoginComponent implements OnDestroy {
	@Output()
	public readonly onAuth: EventEmitter<UserResponseModel> = new EventEmitter<UserResponseModel>();

	@Input({ required: true })
	provider!: Provider;

	protected showLogin: Signal<boolean>;
	protected hasUserProfile = signal(false);

	protected userConfirmationFormGroup = new FormGroup({
		lastName: new FormControl('', [Validators.required]),
		firstName: new FormControl('', [Validators.required])
	});

	private subscription: Subscription = new Subscription();
	private handleLoginSubject: Subject<void> = new Subject();
	private handleLogin$: Observable<void> = this.handleLoginSubject.asObservable();

	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly userService: UserService
	) {
		this.showLogin = computed(() => userService.user() === undefined && !this.hasUserProfile());
		this.initLogin();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	protected handleLogin() {
		this.handleLoginSubject.next();
	}

	private initLogin(): void {
		this.subscription.add(
			this.handleLogin$
				.pipe(
					switchMap(() => this.authenticationService.appUserOAuth(this.provider)),
					switchMap((appUser: UserResponseModel | undefined) => {
						if (appUser) {
							this.userService.user.set(appUser);
							return this.userService.getUserProfile(appUser.id);
						}
						return of(undefined);
					}),
					tap((userProfile: UserProfileResponseModel | undefined) => {
						if (userProfile) {
							this.userService.userProfile.set(userProfile);
							// this.onAuth.emit(appUser);
							// redirect to home page
							this.hasUserProfile.set(true);
							console.log('oauth user profile', userProfile);
						} else {
							this.hasUserProfile.set(false);
						}
					})
				)
				.subscribe()
		);
	}
}
