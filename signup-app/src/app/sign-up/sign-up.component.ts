import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';

/**
 * Component for handling user sign-up.
 */
@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup; // FormGroup to manage sign-up form controls and validation
  passwordVisible = false; // Flag to toggle password visibility in the UI
  postMessage = ''; // Message to display based on the sign-up attempt result
  isPostSuccess = false; // Flag to track the success status of the sign-up attempt
  isLoading = false; // Flag to indicate whether the sign-up process is ongoing

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) { }

  /**
   * Initializes the component and the sign-up form.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the sign-up form with form controls and custom validators.
   */
  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordCaseValidator]]
    }, { validators: this.passwordNameValidator });
  }

  /**
   * Custom validator to ensure the password contains both upper and lower case characters.
   * @param control The form control for the password field.
   * @returns Validation errors if criteria are not met, otherwise null.
   */
  private passwordCaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    return (!value || hasUpperCase && hasLowerCase) ? null : { passwordCase: true };
  }

  /**
   * Custom validator to ensure the password does not contain the user's first or last name.
   * @param group The form group containing the user data.
   * @returns Validation errors if criteria are not met, otherwise null.
   */
  private passwordNameValidator(group: FormGroup): ValidationErrors | null {
    const { firstName, lastName, password } = group.value;
    const nameInPassword = password?.toLowerCase().includes(firstName?.toLowerCase()) || password?.toLowerCase().includes(lastName?.toLowerCase());
    return !password || !firstName || !lastName || !nameInPassword ? null : { passwordNameInvalid: true };
  }

  //Validation checks used in HTML attributes for styling purposes
  isFirstNameInvalid(): boolean {
    return (this.signupForm.get('firstName')?.invalid && this.signupForm.get('firstName')?.touched) || false;
  }

  isLastNameInvalid(): boolean {
    return (this.signupForm.get('lastName')?.invalid && this.signupForm.get('lastName')?.touched) || false;
  }

  isEmailInvalid(): boolean {
    return (this.signupForm.get('email')?.invalid && this.signupForm.get('email')?.touched) || false;
  }

  isPasswordInvalid(): boolean {
    return (this.signupForm.get('password')?.invalid && this.signupForm.get('password')?.touched) || false;
  }


  isPasswordNameInvalid(): boolean {
    return this.signupForm.errors?.['passwordNameInvalid'] && this.signupForm.touched;
  }


  /**
   * Toggles the visibility of the password in the UI.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Handles the form submission. Validates the form and initiates user creation.
   */
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const { password, ...userData } = this.signupForm.value;
      this.createUser(userData);
    }
  }

  /**
   * Calls the sign-up service to create a new user and handles the response.
   * @param userData The user data to be sent to the server, excluding the password.
   */
  private createUser(userData: any): void {
    this.signUpService.createUser(userData).subscribe(
      response => this.handleResponse(true, 'User successfully created!'),
      error => this.handleResponse(false, 'An error occurred during user creation.')
    );
  }

  /**
   * Handles the response from the sign-up service.
   * @param success Indicates whether the sign-up was successful.
   * @param message The message to display based on the success or failure of the sign-up.
   */
  private handleResponse(success: boolean, message: string): void {
    this.isLoading = false;
    this.isPostSuccess = success;
    this.postMessage = message;
  }
}