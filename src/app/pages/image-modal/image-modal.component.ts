import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  @Input() show: boolean = false;
  @Input() imageUrl: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal(event: MouseEvent) {
    event.stopPropagation();
    this.show = false;
    this.close.emit();
  }
}
