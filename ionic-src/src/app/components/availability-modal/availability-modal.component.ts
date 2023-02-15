import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-availability-modal',
  templateUrl: './availability-modal.component.html',
  styleUrls: ['./availability-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityModalComponent implements OnInit {

  startDate;
  endDate;
  selectedDates = null;

  constructor(private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // confirm() {
  //   return this.modalCtrl.dismiss(null, 'confirm');
  // }

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
        this.selectedDates = (startDateFormat < endDateFormat) ?
          this.getDates(startDateFormat, endDateFormat) :
          this.getDates(endDateFormat, startDateFormat);
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

  addDays(days) {
    const date = new Date
  }


}
