export class FileUtil {
  static getInfo(url: string): { name: string; type: string } {
    const name = url.split('/').pop();
    const type = name.split('.').pop();

    return {
      name,
      type,
    };
  }

  static convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
