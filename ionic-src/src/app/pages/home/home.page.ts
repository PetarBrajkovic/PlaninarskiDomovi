import { PexelsService } from './../../services/pexels.service';
import { MountainLodge } from './../../models/mountainLodge.model';
import { LodgeService } from './../../services/lodge.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allLodges = Array<MountainLodge>();
  lodgePhotos = Array();
  loading = false;

  constructor(private lodgeService: LodgeService, private pexels: PexelsService) { }

  ngOnInit() {
    this.loading = true;
    this.lodgeService.getAllMountainLodges().subscribe(data => {
      if (data && data.success) {
        this.allLodges = data.data;
      }
      this.loading = false;
    });

    this.pexels.getLodgePhotos().subscribe(data => {
      if (data && data.photos) {
        this.lodgePhotos = data.photos;
      }
    });
  }

}
