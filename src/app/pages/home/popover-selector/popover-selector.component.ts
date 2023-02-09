import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-selector',
  templateUrl: './popover-selector.component.html',
  styleUrls: ['./popover-selector.component.scss'],
})
export class PopoverSelectorComponent implements OnInit {
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  selectItem(i: number) {
    this.popoverController.dismiss({ index: i });
  }
}
