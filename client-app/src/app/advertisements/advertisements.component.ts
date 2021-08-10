import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryComponent } from 'ngx-masonry';
import { ActionState, ActionStates } from '../actionState';
import { AdvertisementDialogComponent } from '../advertisement-dialog/advertisement-dialog.component';
import { AdvertisementModel } from '../models/advertisementModel';
import { SearchAdvertisementsModel } from '../models/searchAdvertisementsModel';
import { DataService } from '../services/data.service';

@Component({
  selector: 'advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {
  constructor(private dataService: DataService, private dialog: MatDialog) { }
  //@ViewChild('masonry') masonry!: NgxMasonryComponent;

  searchModel: SearchAdvertisementsModel = {};
  loadAdvertisementState: ActionState = <ActionState>{
    action: ActionStates.INIT,
    message: ""
  };

  loadCategoriesState: ActionState = <ActionState>{
    action: ActionStates.INIT,
    message: ""
  };

  advertisements: AdvertisementModel[] = [];
  categories = new Map<string, string>();

  ngOnInit(): void {
    this.loadCategories();
    this.loadAdvertisements();
  }

  loadCategories() {
    this.loadCategoriesState.action = ActionStates.IN_PROCESS;

    this.dataService.getCategories().subscribe(
      (data) => {
        let startIndex = 1;
        data.forEach((item) => this.categories.set(item, `category_${startIndex++}`));
        this.loadCategoriesState.action = ActionStates.IS_COMPLETED;
        this.loadCategoriesState.message = "";
      }, (err) => {
        this.loadCategoriesState.action = ActionStates.IS_FAILED;
        this.loadCategoriesState.message = err.error;
      });
  }

  loadAdvertisements() {
    this.loadAdvertisementState.action = ActionStates.IN_PROCESS;
    this.loadAdvertisementState.message = "Load Advertisements...";

    this.dataService.getAdvertisements(this.searchModel).subscribe(
      (data) => {
        this.advertisements = data;
        this.loadAdvertisementState.action = ActionStates.IS_COMPLETED;
        this.loadAdvertisementState.message = "";
      }, (err) => {
        this.loadAdvertisementState.action = ActionStates.IS_FAILED;
        this.loadAdvertisementState.message = err.error;
      });
  }

  addAdvertisement() {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '80%',
      data: { action: 'Add', advertisement: undefined },
    });

    dialogRef.afterClosed().subscribe((advertisement?: AdvertisementModel) => {
      if (advertisement) {
        this.loadAdvertisements();
        // Not Work...
        // this.advertisements = [advertisement, ...this.advertisements];
        // after the order of items has changed
        // this.masonry.reloadItems();
        // this.masonry.layout();
      }
    });
  }

  onUpdated(advertisement: AdvertisementModel) {
    this.loadAdvertisements();
    //this.advertisements = [advertisement, ...this.advertisements.filter(a => a.id !== advertisement.id)];
  }

  onDeleted(advertisement: AdvertisementModel) {
    this.advertisements = this.advertisements.filter(a => a.id !== advertisement.id);
  }
}
