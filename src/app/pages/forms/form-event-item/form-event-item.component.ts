import { FormEventItemService } from './form-event-item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-event-item',
  templateUrl: './form-event-item.component.html',
  styleUrls: ['./form-event-item.component.css'],
})
export class FormEventItemComponent implements OnInit {
  constructor(private formEventItemService: FormEventItemService) {}

  ngOnInit() {}

  emitEvent() {
    this.formEventItemService.downloadItem$ = { id: 1, name: 'Enric' };
  }
}
