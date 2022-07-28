import { CreateParams } from "react-admin";
import { DataProviderResource } from "../consts";
import { Book, Image } from "../types/entities";
import { ImagesDataProvider } from "./imagesDataProvider";

import { ResourceDataProvider } from "./resourceDataProvider";

type CreateImageResponse = {
  data: {
    image: Image;
    presignedUrl: string;
  };
};

export class BooksDataProvider extends ResourceDataProvider<Book> {
  constructor(public imagesDataProvider: ImagesDataProvider) {
    super();
  }

  public async create(resource: string, params: CreateParams) {
    let imageId: string | null = null;
    const { files, ...rest } = params.data;

    // Upload cover image if passed
    if (files?.rawFile) {
      const fileExt = files.rawFile.type.split("/")[1];
      const imageDTO = {
        extension: fileExt,
      };

      const respImage = (await this.imagesDataProvider.create(
        DataProviderResource.images,
        { data: imageDTO }
      )) as unknown as CreateImageResponse;

      const imageBlob = await this.imagesDataProvider.convertFileUriToBlob(
        files.src
      );

      // upload blob image to presigned url
      await this.imagesDataProvider.upload(
        respImage.data.presignedUrl,
        imageBlob
      );

      imageId = respImage?.data?.image?.id;
    }

    const bookDto = {
      ...rest,
      imageId
    }

    // Create book
    const { data: book } = await super.create(resource, { data: bookDto });

    return { data: book };
  }
}
