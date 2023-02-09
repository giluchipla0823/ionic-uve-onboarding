import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

// import { FileOpener } from '@capacitor-community/file-opener';

const FILE_KEY = 'files';

@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.page.html',
  styleUrls: ['./download-files.page.scss'],
})
export class DownloadFilesPage implements OnInit {
  downloadUrl = '';
  myFiles = [];
  downloadProgress = 0;

  // https://file-examples.com/
  pdfUrl = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  // videoUrl =
  //   'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  videoUrl =
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
  imageUrl =
    'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  downloadFile(url?) {
    // To use our dummy URLs
    this.downloadUrl = url ? url : this.downloadUrl;

    this.http
      .get(this.downloadUrl, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(async (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.downloadProgress = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event.type === HttpEventType.Response) {
          this.downloadProgress = 0;

          const name = this.downloadUrl.substr(
            this.downloadUrl.lastIndexOf('/') + 1
          );
          const base64 = (await this.convertBlobToBase64(event.body)) as string;

          const savedFile = await Filesystem.writeFile({
            path: name,
            data: base64,
            // directory: FilesystemDirectory.Data,
            directory: Directory.Documents,
          });

          const path = savedFile.uri;
          const mimeType = this.getMimetype(name);

          // this.fileOpener.open(path, mimeType)
          //   .then(() => console.log('File is opened'))
          //   .catch(error => console.log('Error openening file', error));

          // FileOpener.open({ filePath: path, contentType: mimeType })
          //   .then(() => console.log('File is opened'))
          //   .catch((error) => console.log('Error openening file', error));

          this.myFiles.unshift(path);

          // Storage.set({
          //   key: FILE_KEY,
          //   value: JSON.stringify(this.myFiles)
          // });
        }
      });
  }

  // Helper functions
  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  private getMimetype(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    } else if (name.indexOf('png') >= 0) {
      return 'image/png';
    } else if (name.indexOf('mp4') >= 0) {
      return 'video/mp4';
    }

    return '';
  }
}
