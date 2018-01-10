import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  title = 'Account Settings';

  user: User;
  isLoading = true;
  editForm: FormGroup;
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

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.editForm = this.formBuilder.group({
      username: this.username,
      email: this.email
    });
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
      res => this.toast.open('account settings saved!', 'success'),
      error => this.toast.open('email already exists', 'danger')
    );
  }

}
