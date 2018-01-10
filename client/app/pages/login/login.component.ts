import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Login';

  loginForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.pattern(EMAIL_REGEX)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/']),
      error => this.toast.open('invalid email or password!', 'danger')
    );
  }

}
