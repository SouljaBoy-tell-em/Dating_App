import { AxiosResponse } from "axios";

import $api from "../http";
import { UserDTO } from "../models/UserDTO";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<UserDTO[]>> {
    return $api.get<UserDTO[]>("/api/users/all");
  }
  static async getInfo() {
    return $api.get("/api/users/info");
  }
}
