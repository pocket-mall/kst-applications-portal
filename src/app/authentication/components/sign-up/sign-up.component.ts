import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { frenchPhoneNumberValidator } from '../../../common/validators/french-phone.validator';
import { dateFormatValidator } from '../../../common/validators/date-format.validator';
import { RestrictNumericDirective } from '../../../common/directives/restrict-numeric.directive';
import { CivilityEnum } from '../../../profile/enums/civility.enum';
import { AuthenticationService } from '../../services/authentication.service';
import { deserializeObject } from '../../../common/helpers/deserializer';
import { SignUpUserModel } from '../../models/sign-up-user.model';

@Component({
	selector: 'kst-sign-up',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RestrictNumericDirective],
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
	protected labels: { [key: string]: string } = {};
	protected isPasswordVisible: boolean;
	protected eyeIconClass = 'mdi-eye';
	protected civilityEnum: typeof CivilityEnum = CivilityEnum;

	protected addressFormGroup = new FormGroup({
		street: new FormControl(undefined),
		city: new FormControl(undefined),
		zipcode: new FormControl(undefined),
		complement: new FormControl(undefined)
	});

	protected signUpFormGroup = new FormGroup({
		civility: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		firstName: new FormControl('', [Validators.required]),
		phone: new FormControl('', [Validators.required, frenchPhoneNumberValidator]),
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.minLength(8), Validators.required]),
		address: this.addressFormGroup,
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
				this.authenticationService.signUp(request).subscribe((profile: any) => console.log(profile));
			}
			console.log(formData);
		} else {
			Object.keys(this.signUpFormGroup.controls).forEach((controlName) => {
				const control = this.signUpFormGroup.get(controlName);
				console.log(control?.errors);
				control?.markAsTouched();
			});
		}
	}

	private initializeLabels() {
		this.labels['Civility'] = 'Civility';
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
}
