import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MountainLodge } from 'src/app/models/mountainLodge.model';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.mode';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LodgeService } from 'src/app/services/lodge.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-my-club',
  templateUrl: './my-club.page.html',
  styleUrls: ['./my-club.page.scss'],
})
export class MyClubPage implements OnInit {

  user: User;
  lodges: MountainLodge[];
  requests = [];
  userFromRequest;

  constructor(private authService: AuthService, private lodgeService: LodgeService,
    private store: Store, private reservationService: ReservationService) { }

  ngOnInit() {
    this.getClubInfo();
    this.getAllLodges();
  }

  getClubInfo() {
    this.authService.getProfile().subscribe(data => {
      this.user = data['user'];
    });
  }

  getAllLodges() {
    const userID = this.store.selectSnapshot(AuthState.getUserId);
    this.lodgeService.getClubMountainLodges(userID).subscribe(data => {
      if (data.success) {
        this.lodges = data.data;
      }
    });
  }

  goToEdit(lodgeId) {
    window.location.href = 'edit-lodge/' + lodgeId;
  }

  goToInfo(lodgeId) {
    window.location.href = 'lodge-info/' + lodgeId;
  }

  accordionGroupChange(data) {
    const lodgeId = data.detail.value;
    if (lodgeId) {
      this.reservationService.getReservationByMountainLodgeById(lodgeId).subscribe(data => {
        this.requests = data.data;
      });
    }
  }

  updateReservation(reservation: Reservation, status) {
    const resUpdate = { ...reservation, status: status };
    this.reservationService.updateReservation(reservation._id, resUpdate)
      .subscribe(data => {
        if (data && data.success) {
          alert('Uspešno procesuiran zahtev');
        }
      });
  }

}
