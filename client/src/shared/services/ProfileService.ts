import { AxiosResponse } from "axios";
import $api from "../http";
import { ChatDTO } from "../models/ChatDTO";
import { ProfileDTO } from "../models/ProfileDTO";

export default class ProfileService {

  static async fieldProfile(profileDTO : ProfileDTO) : Promise<string>{
    return $api.post("/profile/update/general", profileDTO);
  }
}
