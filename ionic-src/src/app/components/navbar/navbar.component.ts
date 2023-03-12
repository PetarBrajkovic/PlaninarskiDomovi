import { Logout } from './../../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from './../../store/auth/auth.state';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { Roles } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input()
  showLoginAndRegister = true;

  @Select(AuthState.isAuthenticated) auth$: Observable<boolean>;

  @Select(AuthState.role) role$: Observable<null | Roles>;
  isAuthenticated: boolean
  role: null | Roles

  constructor(private store: Store, private navController: NavController) { }

  ngOnInit() {
    this.auth$.subscribe(data => this.isAuthenticated = data)
    this.role$.subscribe(data => this.role = data)
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  backToHome() {
    this.navController.navigateBack('/');
  }

  showNewLodgeButton() {
    return this.isAuthenticated && (this.role === Roles.COMMISSION || this.role === Roles.ADMIN);
  }

}
