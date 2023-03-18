import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LodgeService } from 'src/app/services/lodge.service';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

@Component({
  selector: 'app-new-lodge',
  templateUrl: './new-lodge.page.html',
  styleUrls: ['./new-lodge.page.scss'],
})
export class NewLodgePage implements OnInit {

  uploader = Uploader({
    apiKey: 'free',
  });
  options: UploadWidgetConfig = {
    multi: false,
  };
  onComplete = (files: UploadWidgetResult[]) => {
    this.uploadedFileUrl = files[0]?.fileUrl;
  };
  uploadedFileUrl = undefined;

  myForm: FormGroup;

  clubs: User[];
  coordinates: number[];

  constructor(private fb: FormBuilder, private lodgeService: LodgeService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      mountain: ['', Validators.required],
      height: ['', Validators.required],
      contact: ['', Validators.required],
      website: ['', Validators.required],
      numberOfBeds: ['', Validators.required],
      description: ['', Validators.required],
      club: ['', Validators.required]
    });
    this.populateClubs();
  }

  onSubmit(form: FormGroup) {
    const newLodge = {
      name: form.value.name,
      mountain: form.value.mountain,
      height: form.value.height,
      contact: form.value.contact,
      website: form.value.website,
      numberOfBeds: form.value.numberOfBeds,
      description: form.value.description,
      pictureUrl: this.uploadedFileUrl,
      club: form.value.club._id,
      coordinates: this.coordinates
    }
    this.lodgeService.addNewLodge(newLodge).subscribe(data => {
      if (data && data.success) {
        alert('Uspešno dodat nov planinarski dom');
        this.router.navigate(['/']);
      }
    });
  }

  populateClubs() {
    this.authService.getAllClubs().subscribe(res => this.clubs = res.data);
  }

  handleCoordinatesSelected(ev) {
    this.coordinates = ev;
  }

}
