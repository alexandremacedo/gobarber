import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs'
import path from 'path'
import archievesUpload from "@config/archievesUpload";

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(archievesUpload.tmpFolder, file),

      path.resolve(archievesUpload.uploadsFolder, 'uploads', file)
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(archievesUpload.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
