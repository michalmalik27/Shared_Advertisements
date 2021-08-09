import { Component, OnInit } from '@angular/core';
import { ActionState, ActionStates } from '../actionState';
import { AdvertisementModel } from '../models/advertisementModel';
import { SearchAdvertisementsModel } from '../models/searchAdvertisementsModel';
import { DataService } from '../services/data.service';

@Component({
  selector: 'advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {
  constructor(private dataService: DataService) { }
  loadState: ActionState = <ActionState>{ action: ActionStates.INIT, message: "" };
  advertisements?: AdvertisementModel[];

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  addAdvertisement() {

  }

  loadAdvertisements() {
    this.loadState.action = ActionStates.IN_PROCESS;
    this.loadState.message = "Load Advertisements...";

    let searchAdvertisementsModel = <SearchAdvertisementsModel>{
      //category: 'Buy & Sell',
      //isOwn: true,
      //updatedOn: new Date(2021, 08, 08)
    };

    this.dataService.getAdvertisements(searchAdvertisementsModel).subscribe(
      (data) => {
        this.advertisements = data;
        this.loadState.action = ActionStates.IS_COMPLETED;
        this.loadState.message = "";
        console.log(data);
      }, (err) => {
        this.loadState.action = ActionStates.IS_FAILED;
        this.loadState.message = err.error;
      });
  }
}
