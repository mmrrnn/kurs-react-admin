import { CreateParams } from "react-admin";
import { DataProviderResource } from "../consts";
import { Book } from "../types/entities";
import { ImagesDataProvider } from "./imagesDataProvider";

import { ResourceDataProvider } from "./resourceDataProvider";

export class BooksDataProvider extends ResourceDataProvider<Book> {
  constructor(public imagesDataProvider: ImagesDataProvider) {
    super();
  }

  public async create(resource: string, params: CreateParams): Promise<any> {
    const { files, ...rest } = params.data;

    // Create book
    const { data: book } = await super.create(resource, { data: rest });

    // Contruct data params to create Image 
    const fileExt = files.rawFile.type.split("/")[1];
    const imageData = {
      extension: fileExt,
      bookId: book.id,
    };

    // Create cover for already created book
    const respImage = (await this.imagesDataProvider.create(
      DataProviderResource.images,
      { data: imageData }
    )) as any;

    // Construct blob to upload it
    const imageBlob = await this.imagesDataProvider.convertFileToBase64(
      files.rawFile
    );

    // upload blob image to presigned url
    await this.imagesDataProvider.upload(
      respImage.data.presignedUrl,
      imageBlob
    );

    return { data: book };
  }
}
