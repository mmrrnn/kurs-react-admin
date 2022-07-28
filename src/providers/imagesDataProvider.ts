import { CreateParams, CreateResult } from "react-admin";
import { Image } from "../types/entities";

import { ResourceDataProvider } from "./resourceDataProvider";

export class ImagesDataProvider extends ResourceDataProvider<Image> {
  public async create(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<Image>> {
    const url = `${this.url}/${resource}`;

    const { json } = await this.httpClient(url, {
      body: JSON.stringify(params.data),
      method: "POST",
    });

    return {
      data: {
        ...json,
      },
    };
  }

  public async convertFileUriToBlob(fileUri: string): Promise<any> {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();

    return imageBody;
  }

  public async upload(presignedUrl: string, image: Blob): Promise<any> {
    return fetch(presignedUrl, {
      method: "PUT",
      body: image,
    });
  }
}
