import { Roles } from './../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (form.value.password === form.value.confirmPassword) {
      const user = {
        username: form.value.username,
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        role: Roles.USER
      }
      this.authService.registerUser(user).subscribe(data => {
        if (data && data.success) {
          alert('Uspešna registracija');
          this.router.navigate(['/login']);
        }
      });
    }
  }

}
