import { MountainLodge } from './../../models/mountainLodge.model';
import { LodgeService } from './../../services/lodge.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lodge-info',
  templateUrl: './lodge-info.page.html',
  styleUrls: ['./lodge-info.page.scss'],
})
export class LodgeInfoPage implements OnInit {

  loading = false;
  lodge: MountainLodge;

  constructor(private lodgeService: LodgeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.lodgeService.getMountainLodgeById(params['lodgeId']).subscribe(data => {
        if (data && data.success) {
          this.lodge = data.data;
        }
        this.loading = false;
      });
    });
  }

}


