import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.mode';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-availability-modal',
  templateUrl: './availability-modal.component.html',
  styleUrls: ['./availability-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityModalComponent implements OnInit {

  @Input()
  mountainLodgeId: number;

  startDate;
  endDate;
  selectedDates = null;
  numberOfGuests: number;
  availability = null;

  constructor(private modalCtrl: ModalController, private reservationService: ReservationService,
    private store: Store, private changeDetectorRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  handleChangle(val) {
    if (!this.selectedDates && !!val.detail.value) {
      if (val.detail.value.length > 2) {
        const selectedDate = val.detail.value.slice(-1);
        this.selectedDates = [];
        this.selectedDates.push(selectedDate);
        this.startDate = selectedDate;
        // this.selectedDates = val.detail.value.slice(-1);
        return;
      }
      if (val.detail.value.length === 1) {
        this.startDate = val.detail.value[0];
      } else {
        this.endDate = val.detail.value[1];
        const startDateFormat = new Date(this.startDate);
        const endDateFormat = new Date(this.endDate);
        if (startDateFormat < endDateFormat) {
          this.selectedDates = this.getDates(startDateFormat, endDateFormat);
        } else {
          this.selectedDates = this.getDates(endDateFormat, startDateFormat);
          [this.startDate, this.endDate] = [this.endDate, this.startDate];
        }
      }
    } else {
      this.selectedDates = null;
    }
  }

  getDates(startDate, stopDate) {
    const dateArray = [];
    const currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate).toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  checkAvailability() {
    this.reservationService.checkLodgeAvailability(this.mountainLodgeId, this.startDate, this.endDate)
      .subscribe(data => {
        this.availability = data.data.availability;
        this.changeDetectorRef.markForCheck();
      });
  }

  makeNewReservation() {
    const reservation: Reservation = {
      _id: null,
      mountainLodgeId: this.mountainLodgeId,
      userId: this.getUserId(),
      numberOfNights: this.getNumberOfNights(this.startDate, this.endDate),
      numberOfGuests: this.numberOfGuests,
      startDate: this.startDate,
      endDate: this.endDate,
      status: ReservationStatus.DEFAULT
    }
    this.reservationService.createNewReservation(reservation).subscribe(data => {
      if (data && data.success) {
        alert('Uspešna rezervacija');
        this.modalCtrl.dismiss();
        this.router.navigate(['/']);
      }
    });
  }

  getNumberOfNights(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getUserId() {
    return this.store.selectSnapshot(AuthState.getUserId);
  }

}
