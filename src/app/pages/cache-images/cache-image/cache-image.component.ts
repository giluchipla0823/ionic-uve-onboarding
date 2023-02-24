import { Component, Input, OnInit } from '@angular/core';
import { CacheImageService } from 'src/app/services/cache-image.service';

@Component({
  selector: 'app-cache-image',
  templateUrl: './cache-image.component.html',
  styleUrls: ['./cache-image.component.scss'],
})
export class CacheImageComponent implements OnInit {
  public _src: string = '';

  @Input() spinner = false;

  @Input()
  set src(imageUrl: string) {
    this.cacheImageService
      .storeAndLoadImage(imageUrl)
      .then(({ src }) => (this._src = src));
  }

  constructor(private cacheImageService: CacheImageService) {}

  ngOnInit() {}
}
