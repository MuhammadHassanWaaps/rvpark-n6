import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cc-result-slide',
  templateUrl: './cc-result-slide.component.html',
  styleUrls: ['./cc-result-slide.component.scss'],
})
export class CcResultSlideComponent implements OnInit {
  @Output('toCheckout') toCheckout: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
  openCheckout() {
    this.toCheckout.emit();
  }
}
