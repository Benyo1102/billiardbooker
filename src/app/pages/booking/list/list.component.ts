import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() bookingObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;
  
  constructor() { }

  ngOnChanges() {
    if (this.bookingObjectInput) {
      this.chosenImage = this.bookingObjectInput[0];
      this.reload();
    
    }
  }

  ngOnInit(): void {
       
  }

  reload() {
    this.imageObjectEmitter.emit(this.chosenImage);
  }

}
