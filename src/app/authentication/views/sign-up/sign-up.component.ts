import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailSignUpComponent } from '../../components/email-sign-up/email-sign-up.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OauthLoginComponent } from '../../components/oauth-login/oauth-login.component';
import { Provider } from '../../enums/provider';

@Component({
	selector: 'kst-sign-up',
	standalone: true,
	imports: [CommonModule, EmailSignUpComponent, ReactiveFormsModule, OauthLoginComponent],
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
	protected emailSignUpFormGroup: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required])
	});
	protected readonly Provider = Provider;

	protected submitForm() {}

	protected isControlInvalid(controlName: string): boolean {
		const control = this.emailSignUpFormGroup.get(controlName);
		return control !== null && control.invalid && control.touched;
	}
}
