import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSignUpComponent } from './email-sign-up.component';

describe('SignUpComponent', () => {
	let component: EmailSignUpComponent;
	let fixture: ComponentFixture<EmailSignUpComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [EmailSignUpComponent]
		});
		fixture = TestBed.createComponent(EmailSignUpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
