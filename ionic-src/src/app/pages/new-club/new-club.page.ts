import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.page.html',
  styleUrls: ['./new-club.page.scss'],
})
export class NewClubPage implements OnInit {

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
    if (form.value.password === form.value.confirmPassword) {
      const user = {
        username: form.value.username,
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        role: Roles.MANAGER
      }
      this.authService.registerUser(user).subscribe(data => {
        if (data && data.success) {
          alert('Uspešna registracija');
          this.router.navigate(['/']);
        }
      });
    }
  }

}
