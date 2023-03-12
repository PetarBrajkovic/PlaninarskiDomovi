import { AuthState } from './../../store/auth/auth.state';
import { Login } from './../../store/auth/auth.actions';
import { Store } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private navController: NavController, private store: Store) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    const user = {
      username: form.value.username,
      password: form.value.password
    }
    this.store.dispatch(new Login(user)).subscribe(() => {
      if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
        this.navController.navigateBack('/');
      }
    });
  }

}
