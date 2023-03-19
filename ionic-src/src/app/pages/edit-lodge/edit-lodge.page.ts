import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from 'src/app/components/map/map.component';
import { MountainLodge } from 'src/app/models/mountainLodge.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LodgeService } from 'src/app/services/lodge.service';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

@Component({
  selector: 'app-edit-lodge',
  templateUrl: './edit-lodge.page.html',
  styleUrls: ['./edit-lodge.page.scss'],
})
export class EditLodgePage implements OnInit {

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

  @ViewChild(MapComponent)
  map: MapComponent;

  myForm: FormGroup;
  lodge;
  clubs: User[];
  coordinates: number[];

  constructor(private fb: FormBuilder, private lodgeService: LodgeService,
    private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lodgeService.getMountainLodgeById(params['lodgeId']).subscribe(data => {
        if (data && data.success) {
          this.lodge = data.data;
          this.fillForm();
        }
      });
    });
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
    const updatedLodge: MountainLodge = {
      _id: this.lodge._id,
      name: form.value.name,
      mountain: form.value.mountain,
      height: form.value.height,
      contact: form.value.contact,
      website: form.value.website,
      numberOfBeds: form.value.numberOfBeds,
      description: form.value.description,
      club: form.value.club._id,
      coordinates: this.coordinates
    }
    updatedLodge.pictureUrl = this.uploadedFileUrl ? this.uploadedFileUrl : this.lodge.pictureUrl;
    this.lodgeService.updateLodge(this.lodge._id, updatedLodge).subscribe(data => {
      if (data && data.success) {
        alert('Uspešno izmenjen planinarski dom');
        window.location.href = 'lodge-info/' + this.lodge._id;
      }
    });
  }

  fillForm() {
    this.myForm = this.fb.group({
      name: [this.lodge.name, Validators.required],
      mountain: [this.lodge.mountain, Validators.required],
      height: [this.lodge.height, Validators.required],
      contact: [this.lodge.contact, Validators.required],
      website: [this.lodge.website, Validators.required],
      numberOfBeds: [this.lodge.numberOfBeds, Validators.required],
      description: [this.lodge.description, Validators.required],
      club: [this.lodge.club, Validators.required]
    });
    this.coordinates = this.map.coordinates = this.lodge.coordinates;
  }

  populateClubs() {
    this.authService.getAllClubs().subscribe(res => this.clubs = res.data);
  }

  handleCoordinatesSelected(ev) {
    this.coordinates = ev;
  }

}
