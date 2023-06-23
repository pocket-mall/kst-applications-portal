import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordLoginComponent } from './password-login.component';

describe('PasswordLoginComponent', () => {
	let component: PasswordLoginComponent;
	let fixture: ComponentFixture<PasswordLoginComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PasswordLoginComponent]
		});
		fixture = TestBed.createComponent(PasswordLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
