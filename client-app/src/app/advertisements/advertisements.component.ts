import { Component, OnInit } from '@angular/core';
import { AdvertisementModel } from '../models/advertisementModel';
import { DataService } from '../services/data.service';

@Component({
  selector: 'advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //   let newAdvertisement = <AdvertisementModel>{
    //     title: "גלידות מושלמות",
    //     description: "גלידות טעימות ממש",
    //     category: "Buy & Sell",
    //     image: "https://www.cartube.co.il/images/stories/mazda/general/mazda-5-2011.jpg",
    //     createdByUserName: "Mical"
    //   }

    //   this.dataService.addAdvertisements(newAdvertisement).subscribe(
    //     (data) => console.log('success'),
    //     (err) => {
    //       console.log(err.error);
    //     });
    // }
  }
