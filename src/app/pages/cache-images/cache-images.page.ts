import { finalize, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CacheImageService } from 'src/app/services/cache-image.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cache-images',
  templateUrl: './cache-images.page.html',
  styleUrls: ['./cache-images.page.scss'],
})
export class CacheImagesPage implements OnInit {
  products = [];

  constructor(
    private http: HttpClient,
    private cacheImageService: CacheImageService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async loadProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
    });

    await loading.present();

    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .pipe(
        // switchMap(async (products) => {
        //   return await Promise.all(
        //     products.map(async (product) => {
        //       const { src: image } =
        //         await this.cacheImageService.storeAndLoadImage(product.image);

        //       return {
        //         ...product,
        //         image,
        //       };
        //     })
        //   );
        // }),
        finalize(() => loading.dismiss())
      )
      .subscribe((res) => {
        console.log('PRODUCTS', res);
        this.products = res;
      });
  }

  async clearCache() {
    this.cacheImageService.clearCache();
  }

  clearData() {
    this.products = [];
  }
}
