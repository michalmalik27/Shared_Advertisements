import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisementDialogComponent } from '../advertisement-dialog/advertisement-dialog.component';
import { AdvertisementModel } from '../models/advertisementModel';

@Component({
  selector: 'advertisement-card',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  @Input()
  advertisement!: AdvertisementModel;

  @Input()
  categoryClass?: string;

  @Output()
  onUpdated = new EventEmitter<AdvertisementModel>();

  @Output()
  onDeleted = new EventEmitter<AdvertisementModel>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  update() {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '80%',
      data: { action: 'Update', advertisement: this.advertisement },
    });

    dialogRef.afterClosed().subscribe((advertisement?: AdvertisementModel) => {
      if (advertisement)
        this.onUpdated.emit(advertisement);
    });
  }

  delete() {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '500px',
      data: { action: 'Delete', advertisement: this.advertisement },
    });

    dialogRef.afterClosed().subscribe((advertisement?: AdvertisementModel) => {
      if (advertisement)
        this.onDeleted.emit(advertisement);
    });
  }
}
