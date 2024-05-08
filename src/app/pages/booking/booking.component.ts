import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { BookingService } from '../../shared/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      //console.log(data);
      this.bookingObject = data;
    })
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
  }

}