import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';
import { AlertNotificationService } from 'src/app/shared';

@Component({
  selector: 'posts-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  isLoading = false;
  createUser$!: Subscription;

  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit() {
    this.signupForm = this._fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get name(): AbstractControl | null {
    return this.signupForm?.get('name');
  }

  get email(): AbstractControl | null {
    return this.signupForm?.get('email');
  }

  get password(): AbstractControl | null {
    return this.signupForm?.get('password');
  }

  onSignup(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const value = form.value;
    this.createUser$ = this._authService.createUser(value).subscribe(
      (response) => {
        this.isLoading = false;
        this.signupForm.reset();
      },
      (error) => {
        this._alertNotificationService.error(error.error.message);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.createUser$) this.createUser$.unsubscribe();
  }
}
