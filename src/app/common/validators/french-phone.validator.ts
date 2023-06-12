import { AbstractControl, ValidationErrors } from '@angular/forms';

export function frenchPhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
	const phoneNumberRegex = /^((\+)33|0|0033)[1-9](\d{2}){4}$/;

	if (!control.value || phoneNumberRegex.test(control.value)) {
		return null;
	}

	return { frenchPhoneNumber: true };
}
