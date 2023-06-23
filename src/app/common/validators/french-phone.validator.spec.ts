import { AbstractControl, FormControl } from '@angular/forms';
import { frenchPhoneNumberValidator } from './french-phone.validator';

describe('FrenchPhoneNumberValidator', () => {
	let control: AbstractControl;

	beforeEach(() => {
		control = new FormControl('', frenchPhoneNumberValidator);
	});

	it('should pass validation for a valid French phone number', () => {
		control.setValue('+33612345678');
		expect(control.valid).toBeTruthy();
		expect(control.errors).toBeNull();
	});

	it('should fail validation for an invalid French phone number', () => {
		control.setValue('12345');
		expect(control.invalid).toBeTruthy();
		expect(control.errors).toEqual({ frenchPhoneNumber: true });
	});

	it('should pass validation for an empty phone number', () => {
		control.setValue('');
		expect(control.valid).toBeTruthy();
		expect(control.errors).toBeNull();
	});

	it('should pass validation for null phone number', () => {
		control.setValue(null);
		expect(control.valid).toBeTruthy();
		expect(control.errors).toBeNull();
	});
});
