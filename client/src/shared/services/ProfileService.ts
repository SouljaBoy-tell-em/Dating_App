import { AxiosResponse } from "axios";

import $api, { API_URL } from "../http";
import { ChatDTO } from "../models/chat/ChatDTO";
import { ProfileDTO } from "../models/ProfileDTO";


const $avatar_url = API_URL + "/photo/1";

export {$avatar_url};

export default class ProfileService {
  static async fieldProfile(profileDTO: ProfileDTO): Promise<string> {
    return $api.post("/profile/update/general", profileDTO);
  }

  static async uploadAvatar(file: any): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    return $api.post("/photo/add?avatar=true", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
