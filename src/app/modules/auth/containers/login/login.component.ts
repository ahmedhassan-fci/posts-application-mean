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
  selector: 'posts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  login$!: Subscription;

  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm?.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm?.get('password');
  }

  onLogin(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const value = form.value;
    this.login$ = this._authService.login(value).subscribe(
      (response) => {
        this.isLoading = false;
        this.loginForm.reset();
      },
      (error) => {
        this._alertNotificationService.error(error.error.message);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.login$) this.login$.unsubscribe();
  }
}
