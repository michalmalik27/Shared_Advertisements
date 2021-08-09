import { Component, Input, OnInit } from '@angular/core';
import { AdvertisementModel } from '../models/advertisementModel';

@Component({
  selector: 'advertisement-card',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  @Input()
  advertisement!: AdvertisementModel;

  constructor() { }

  ngOnInit(): void {
  }

}
