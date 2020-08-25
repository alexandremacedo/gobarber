import { container } from "tsyringe";

import IStorageProvider from "./models/IStorageProvider";
import DiskStorageProvider from "./implementations/DiskStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";
import archievesUpload from "@config/archievesUpload";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[archievesUpload.driver],
)

