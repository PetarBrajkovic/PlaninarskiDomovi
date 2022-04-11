import { AuthState } from './../../store/auth/auth.state';
import { Login } from './../../store/auth/auth.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store) { }

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
        this.router.navigate(['/']);
      }
    });
  }

}
