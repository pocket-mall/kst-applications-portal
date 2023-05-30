import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { LoginFormModel } from '../../models/login.form.model';
import { AppUserModel } from '../../models/app.user.model';

@Component({
	selector: 'kst-password-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './password-login.component.html',
	styleUrls: ['./password-login.component.scss']
})
export class PasswordLoginComponent implements OnDestroy {
	@Output()
	public readonly onAuth: EventEmitter<AppUserModel> = new EventEmitter<AppUserModel>();

	protected loginFormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required])
	});

	private subscription: Subscription = new Subscription();
	private handleLoginSubject: Subject<LoginFormModel> = new Subject();
	private handleLogin$: Observable<LoginFormModel> = this.handleLoginSubject.asObservable();

	constructor(private readonly authenticationService: AuthenticationService) {
		this.initLogin();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	protected handleLogin(): void {
		const email = this.loginFormGroup.get('email')?.value;
		const password = this.loginFormGroup.get('password')?.value;
		if (email && password) {
			this.handleLoginSubject.next({ email, password });
		}
	}

	private initLogin(): void {
		this.subscription.add(
			this.handleLogin$
				.pipe(
					switchMap(({ email, password }: LoginFormModel) =>
						this.authenticationService.appUserAuthentication(email, password)
					),
					tap((appUser: AppUserModel | undefined) => {
						if (appUser) {
							this.onAuth.emit(appUser);
						}
					})
				)
				.subscribe()
		);
	}
}
