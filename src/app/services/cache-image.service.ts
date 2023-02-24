import { FileUtil } from './../utils/file.util';
import { Injectable } from '@angular/core';
import {
  Filesystem,
  Directory,
  WriteFileResult,
  FileInfo,
} from '@capacitor/filesystem';

const CACHE_FOLDER = 'CACHED-IMG';
const TTL = 60 * 60;
// const TTL = 10;

@Injectable({
  providedIn: 'root',
})
export class CacheImageService {
  constructor() {}

  init(): void {
    const options = {
      directory: Directory.Cache,
      path: `${CACHE_FOLDER}`,
    };

    Filesystem.readdir(options)
      .then(() => {})
      .catch(() => Filesystem.mkdir(options));
  }

  storeAndLoadImage(imageUrl: string): Promise<{ src: string }> {
    const { name: imageName, type: fileType } = FileUtil.getInfo(imageUrl);

    const currentTime = new Date().getTime();

    return new Promise((resolve, reject) => {
      Filesystem.readFile({
        directory: Directory.Cache,
        path: `${CACHE_FOLDER}/${imageName}`,
      })
        .then(async ({ data }) => {
          console.log('Local file!');

          const { ctime } = await Filesystem.stat({
            directory: Directory.Cache,
            path: `${CACHE_FOLDER}/${imageName}`,
          });

          const expiredAt = ctime + TTL * 1000;

          if (expiredAt < currentTime) {
            console.log('Delete by expired: ', imageName);
            await Filesystem.deleteFile({
              directory: Directory.Cache,
              path: `${CACHE_FOLDER}/${imageName}`,
            });
          }

          resolve({ src: `data:image/${fileType};base64,${data}` });
        })
        .catch(async (e) => {
          await this.storeImage(imageUrl, imageName);
          Filesystem.readFile({
            directory: Directory.Cache,
            path: `${CACHE_FOLDER}/${imageName}`,
          })
            .then((readFile) => {
              console.log('File saved: ', readFile);

              resolve({
                src: `data:image/${fileType};base64,${readFile.data}`,
              });
            })
            .catch((e) => {
              console.log('This should not happen: ', e);
              resolve({ src: imageUrl });
            });
        });
    });
  }

  async getFiles() {
    return await Filesystem.readdir({
      directory: Directory.Cache,
      path: CACHE_FOLDER,
    });
  }

  async checkExpiredAndClearCache() {
    const currentTime = new Date().getTime();
    const fileEntries = await this.getFiles();

    fileEntries.files.map(async (f) => {
      const expiredAt = f.ctime + TTL * 1000;

      if (expiredAt < currentTime) {
        console.log('Delete by expired: ', f);
        await Filesystem.deleteFile({
          directory: Directory.Cache,
          path: `${CACHE_FOLDER}/${f.name}`,
        });
      }
    });
  }

  async clearCache() {
    const fileEntries = await this.getFiles();

    return Promise.all(
      fileEntries.files.map(async (f) => {
        console.log('Delete: ', f);

        await Filesystem.deleteFile({
          directory: Directory.Cache,
          path: `${CACHE_FOLDER}/${f.name}`,
        });
      })
    ).catch((e) => {
      console.log(e);
    });
  }

  // https://forum.ionicframework.com/t/how-to-download-an-image-then-store-it-on-the-device/199841/2
  private async storeImage(
    url: string,
    path: string
  ): Promise<WriteFileResult> {
    const response = await fetch(`${url}`);
    // convert to a Blob
    const blob = await response.blob();

    // convert to base64 data, which the Filesystem plugin requires
    const base64Data = (await FileUtil.convertBlobToBase64(blob)) as string;

    const savedFile = await Filesystem.writeFile({
      path: `${CACHE_FOLDER}/${path}`,
      data: base64Data,
      directory: Directory.Cache,
    });
    return savedFile;
  }
}
