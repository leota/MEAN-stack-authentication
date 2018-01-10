import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  title = 'Signup';

  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
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
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.open('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.open('email already exists', 'danger')
    );
  }
}
