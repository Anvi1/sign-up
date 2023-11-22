import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordCaseValidator
      ]]
    });
  }

  passwordCaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    if (!hasUpperCase || !hasLowerCase) {
      return { passwordCase: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signUpService.createUser(this.signupForm.value).subscribe(
        response => console.log('User created!', response),
        error => console.error('Error occurred:', error)
      );
    }
  }
}
