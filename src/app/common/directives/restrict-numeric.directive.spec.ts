import { RestrictNumericDirective } from './restrict-numeric.directive';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
	standalone: true,
	imports: [CommonModule, RestrictNumericDirective],
	template: ` <input id="testInput" type="text" kstRestrictNumeric /> `
})
class TestComponent {}

describe('RestrictNumericDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let inputElement: DebugElement;

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		inputElement = fixture.debugElement.query(By.css('#testInput'));
		fixture.detectChanges();
	});

	it('should restrict input to numeric values only', () => {
		const testInput = inputElement.nativeElement as HTMLInputElement;

		testInput.value = 'abc123xyz';
		testInput.dispatchEvent(new Event('input'));
		expect(testInput.value).toBe('123');

		testInput.value = '987xyz';
		testInput.dispatchEvent(new Event('input'));
		expect(testInput.value).toBe('987');

		testInput.value = 'abcxyz';
		testInput.dispatchEvent(new Event('input'));
		expect(testInput.value).toBe('');

		testInput.value = '123';
		testInput.dispatchEvent(new Event('input'));
		expect(testInput.value).toBe('123');
	});
});
