import { Logout } from './../../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from './../../store/auth/auth.state';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input()
  showLoginAndRegister = true;

  @Select(AuthState.isAuthenticated) auth$: Observable<boolean>;
  isAuthenticated: boolean

  constructor(private store: Store) { }

  ngOnInit() {
    this.auth$.subscribe(data => {
      this.isAuthenticated = data;
    })
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
