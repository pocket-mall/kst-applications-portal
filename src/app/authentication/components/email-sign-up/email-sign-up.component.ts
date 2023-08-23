import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { frenchPhoneNumberValidator } from '../../../common/validators/french-phone.validator';
import { dateFormatValidator } from '../../../common/validators/date-format.validator';
import { RestrictNumericDirective } from '../../../common/directives/restrict-numeric.directive';
import { AuthenticationService } from '../../services/authentication.service';
import { deserializeObject } from '../../../common/helpers/deserializer';
import { SignUpUserModel } from '../../models/sign-up-user.model';
import { UserProfileResponseModel } from '../../../pocket-base/models/user.profile.response.model';

@Component({
	selector: 'kst-email-sign-up',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RestrictNumericDirective],
	templateUrl: './email-sign-up.component.html',
	styleUrls: ['./email-sign-up.component.scss']
})
export class EmailSignUpComponent {
	protected labels: { [key: string]: string } = {};
	protected isPasswordVisible: boolean;
	protected eyeIconClass: string = 'mdi-eye';

	protected signUpFormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.minLength(8), Validators.required]),
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		phone: new FormControl('', [Validators.required, frenchPhoneNumberValidator]),
		birthday: new FormControl(undefined, [dateFormatValidator])
	});

	constructor(private readonly authenticationService: AuthenticationService) {
		this.isPasswordVisible = false;
		this.initializeLabels();
	}

	protected togglePasswordVisibility(): void {
		this.isPasswordVisible = !this.isPasswordVisible;
		this.eyeIconClass = this.isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye';
	}

	protected getErrorMessage(controlName: string): string {
		const control = this.signUpFormGroup.get(controlName);
		if (control !== null) {
			if (control.errors?.['required']) {
				return 'This field is required.';
			}
			if (control.errors?.['email']) {
				return 'Please enter a valid email address.';
			}
			if (control.errors?.['frenchPhoneNumber']) {
				return 'Please enter a valid phone number.';
			}
			if (control.errors?.['minlength']) {
				return 'Please enter at least 8 characters for password';
			}
		}

		return '';
	}

	protected isControlInvalid(controlName: string): boolean {
		const control = this.signUpFormGroup.get(controlName);
		return control !== null && control.invalid && control.touched;
	}

	protected onSubmit() {
		if (this.signUpFormGroup.valid) {
			const formData = this.signUpFormGroup.value;
			const request = deserializeObject<SignUpUserModel>(formData, SignUpUserModel);
			if (request) {
				this.authenticationService
					.signUp(request)
					.subscribe((profile: UserProfileResponseModel | undefined) => console.log(profile));
			}
		} else {
			this.toggleInvalidForm();
		}
	}

	private initializeLabels() {
		this.labels['civility'] = '';
		this.labels['lastName'] = 'Last Name';
		this.labels['firstName'] = 'First Name';
		this.labels['phone'] = 'Phone';
		this.labels['email'] = 'Email';
		this.labels['password'] = 'Password';
		this.labels['street'] = 'Street';
		this.labels['city'] = 'City';
		this.labels['zipcode'] = 'Zip Code';
		this.labels['complement'] = 'Complement';
		this.labels['birthday'] = 'Birthday';
	}

	private toggleInvalidForm() {
		Object.keys(this.signUpFormGroup.controls).forEach((controlName) => {
			const control = this.signUpFormGroup.get(controlName);
			control?.markAsTouched();
		});
	}
}
