import { MountainLodge } from './../../models/mountainLodge.model';
import { LodgeService } from './../../services/lodge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AvailabilityModalComponent } from 'src/app/components/availability-modal/availability-modal.component';

@Component({
  selector: 'app-lodge-info',
  templateUrl: './lodge-info.page.html',
  styleUrls: ['./lodge-info.page.scss'],
})
export class LodgeInfoPage implements OnInit {

  loading = false;
  lodge: MountainLodge;

  constructor(private lodgeService: LodgeService, private route: ActivatedRoute,
    private modalCtrl: ModalController) { }

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

  async openAvailabilityModal() {
    const modal = await this.modalCtrl.create({
      component: AvailabilityModalComponent,
      componentProps: {
        mountainLodgeId: this.lodge._id
      }
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
  }

  goToEdit() {
    window.location.href = 'edit-lodge/' + this.lodge._id;
  }

}


