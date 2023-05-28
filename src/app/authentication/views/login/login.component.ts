import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import { LoginFormModel } from '../../models/login.form.model';

@Component({
	selector: 'kst-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
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
					)
				)
				.subscribe()
		);
	}
}
