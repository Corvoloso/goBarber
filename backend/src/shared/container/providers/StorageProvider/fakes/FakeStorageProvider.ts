import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.files.findIndex(fileName => fileName === file);

    this.files.splice(fileIndex, 1);
  }
}

export default FakeStorageProvider;
