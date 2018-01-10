import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  title = 'Rgistered Users';
  users: User[] = [];
  isLoading = true;
  displayedColumns = ['username', 'email', 'role', 'action'];
  dataSource: any;

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.dataSource = new TableDataSource(this.users);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.open('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class TableDataSource extends DataSource<any> {
  constructor(private data: any) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    return Observable.of(this.data);
  }

  disconnect() { }
}
