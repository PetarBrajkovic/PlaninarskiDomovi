import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.page.html',
  styleUrls: ['./new-club.page.scss'],
})
export class NewClubPage implements OnInit {

  myForm: FormGroup;
  isAdmin = false;

  constructor(
    private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      role: ['CLUB', Validators.required]
    });
    this.checkIfAdmin();
  }

  onSubmit(form: FormGroup) {
    if (form.value.password === form.value.confirmPassword) {
      const user = {
        username: form.value.username,
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        role: form.value.role
      }
      this.authService.registerUser(user).subscribe(data => {
        if (data && data.success) {
          alert('Uspešna registracija');
          this.router.navigate(['/']);
        }
      });
    }
  }

  checkIfAdmin() {
    this.isAdmin = this.store.selectSnapshot(AuthState.role) === 'ADMIN';
  }

}
