import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

import { FileOpener } from '@capacitor-community/file-opener';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.page.html',
  styleUrls: ['./download-files.page.scss'],
})
export class DownloadFilesPage implements OnInit {
  downloadUrl = '';
  myFiles = [];
  downloadProgress = 0;

  pdfUrl = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  videoUrl =
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  // videoUrl =
  //   'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
  imageUrl =
    'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg';

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async downloadFile(url?: string) {
    this.downloadUrl = url ? url : this.downloadUrl;

    const loading = await this.loadingCtrl.create({
      message: 'Descargando...<span class="download-progress">0</span>%',
    });

    await loading.present();

    this.http
      .get(this.downloadUrl, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: async (event) => {
          if (event.type === HttpEventType.DownloadProgress) {
            const downloadProgress =
              Math.round((100 * event.loaded) / event.total) || 0;

            this.renderDownloadProgress(downloadProgress);
          } else if (event.type === HttpEventType.Response) {
            this.renderDownloadProgress(100);

            const name = this.downloadUrl.substr(
              this.downloadUrl.lastIndexOf('/') + 1
            );
            const base64 = (await this.convertBlobToBase64(
              event.body
            )) as string;

            const savedFile = await Filesystem.writeFile({
              path: name,
              data: base64,
              directory: Directory.Documents,
            });

            await loading.dismiss();

            const toast = await this.toastController.create({
              message: 'Archivo descargado',
              duration: 2000,
            });

            await toast.present();

            const path = savedFile.uri;
            const mimeType = this.getMimetype(name);

            this.myFiles.unshift({ path, mimeType });
          }
        },
        error: (err) => {
          console.log('ERROR: ' + JSON.stringify(err));
          loading.dismiss();
        },
      });
  }

  openFile(file: any) {
    const { path, mimeType } = file;

    if (this.platform.is('capacitor')) {
      FileOpener.open({ filePath: path, contentType: mimeType })
        .then(() => console.log('File is opened'))
        .catch((error) => console.log('Error openening file', error));
    }

    console.log('OPEN FILE', file);
  }

  deleteFile(file: any) {
    console.log('DELETE FILE', file);
  }

  private renderDownloadProgress(value: number): void {
    document.querySelector('ion-loading span.download-progress').innerHTML =
      value.toString();
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  private getMimetype(name: string) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    }

    if (name.indexOf('png') >= 0) {
      return 'image/png';
    }

    if (name.indexOf('jpg') >= 0) {
      return 'image/jpg';
    }

    if (name.indexOf('mp4') >= 0) {
      return 'video/mp4';
    }

    return '';
  }
}
