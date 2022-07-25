import { CreateParams, CreateResult } from "react-admin";
import { Image } from "../types/entities";

import { ResourceDataProvider } from "./resourceDataProvider";

export class ImagesDataProvider extends ResourceDataProvider<Image> {
  public async create(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<Image>> {
    const url = `${this.url}/${resource}`;

    console.log("Creating body for POST /images", params.data);

    const { json } = await this.httpClient(url, {
      body: JSON.stringify(params.data),
      method: "POST",
    });

    console.log("Received JSON from POST /images", json);

    return {
      data: {
        ...json,
      },
    };
  }

  public async convertFileToBase64(blob?: Blob): Promise<any> {
    if (!blob) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", reject);
    });
  }

  public async upload(presignedUrl: string, image: Blob): Promise<any> {
    return fetch(presignedUrl, {
      method: "PUT",
      body: image,
    });
  }
}
