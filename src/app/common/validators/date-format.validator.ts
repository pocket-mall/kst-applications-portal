import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateFormatValidator(control: AbstractControl): ValidationErrors | null {
	const value = control.value;

	if (!value) {
		return null;
	}

	// Check if the value matches either the format "YYYY-MM-DD" or "DD/MM/YYYY"
	const dateFormat1 = /^\d{4}-\d{2}-\d{2}$/;
	const dateFormat2 = /^\d{2}\/\d{2}\/\d{4}$/;

	if (dateFormat1.test(value) || dateFormat2.test(value)) {
		return null; // The birthday format is valid
	}

	return { invalidBirthdayFormat: true };
}
