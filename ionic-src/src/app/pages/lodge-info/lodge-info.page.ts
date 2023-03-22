import { MountainLodge } from './../../models/mountainLodge.model';
import { LodgeService } from './../../services/lodge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AvailabilityModalComponent } from 'src/app/components/availability-modal/availability-modal.component';
import { Roles } from 'src/app/models/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-lodge-info',
  templateUrl: './lodge-info.page.html',
  styleUrls: ['./lodge-info.page.scss'],
})
export class LodgeInfoPage implements OnInit {

  loading = false;
  lodge: MountainLodge;
  role: Roles;
  lodges: MountainLodge[];
  userID;
  showEditForRender = false;

  constructor(private lodgeService: LodgeService, private route: ActivatedRoute,
    private modalCtrl: ModalController, private store: Store) {
    this.userID = this.store.selectSnapshot(AuthState.getUserId);
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.lodgeService.getMountainLodgeById(params['lodgeId']).subscribe(data => {
        if (data && data.success) {
          this.lodge = data.data;
          this.role = this.store.selectSnapshot(AuthState.role);
          this.getAllLodges();
        }
        this.loading = false;
      });
    });
  }

  getAllLodges() {
    this.lodgeService.getClubMountainLodges(this.userID).subscribe(data => {
      if (data.success) {
        this.lodges = data.data;
        this.showEditForRender = this.showEdit();
      }
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
  }

  goToEdit() {
    window.location.href = 'edit-lodge/' + this.lodge._id;
  }

  showEdit() {
    switch (this.role) {
      case Roles.CLUB:
        return this.checkEditableClubs();
      case Roles.COMMISSION:
      case Roles.ADMIN:
        return true;
      default:
        return false;
    }
  }

  checkEditableClubs() {
    return this.lodges.filter(lodge => lodge._id === this.lodge._id).length > 0;
  }

}


