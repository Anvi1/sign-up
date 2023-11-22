import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { SignUpService } from '../services/sign-up.service';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpServiceMock: any;

  beforeEach(async () => {
    // Mock SignUpService
    signUpServiceMock = jasmine.createSpyObj('SignUpService', ['createUser']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignUpComponent],
      providers: [
        FormBuilder,
        { provide: SignUpService, useValue: signUpServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm instanceof FormGroup).toBeTruthy();
  });

  it('should validate form fields', () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();

    form.controls['firstName'].setValue('John');
    form.controls['lastName'].setValue('Doe');
    form.controls['email'].setValue('john@example.com');
    form.controls['password'].setValue('Password1');
    expect(form.valid).toBeTruthy();
  });

  it('should call createUser on valid form submission', () => {
    const validUserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password1'
    };

    component.signupForm.setValue(validUserData);
    signUpServiceMock.createUser.and.returnValue(of({}));

    component.onSubmit();

    expect(signUpServiceMock.createUser).toHaveBeenCalledOnceWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
      // Note: Password is excluded
    });
  });
});
