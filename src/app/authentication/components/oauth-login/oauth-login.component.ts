import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { GoogleLogoComponent } from '../../../common/components/svg-components/google-logo/google-logo.component';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Provider } from '../../enums/provider';
import { UserResponseModel } from '../../../pocket-base/models/user.response.model';

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

	private subscription: Subscription = new Subscription();
	private handleLoginSubject: Subject<void> = new Subject();
	private handleLogin$: Observable<void> = this.handleLoginSubject.asObservable();

	constructor(private readonly authenticationService: AuthenticationService) {
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
					tap((appUser: UserResponseModel | undefined) => {
						if (appUser) {
							this.onAuth.emit(appUser);
						}
					})
				)
				.subscribe()
		);
	}
}
