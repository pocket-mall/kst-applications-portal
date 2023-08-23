import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthUserConfirmationComponent } from './oauth-user-confirmation.component';

describe('OauthUserConfirmationComponent', () => {
  let component: OauthUserConfirmationComponent;
  let fixture: ComponentFixture<OauthUserConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OauthUserConfirmationComponent]
    });
    fixture = TestBed.createComponent(OauthUserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
