import { AxiosResponse } from "axios";

import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", { username, password });
  }

  static async registration(username: string, password: string, email: string) {
    return $api.post<AuthResponse>("/auth/signup", {
      username,
      password,
      email,
    });
  }
}
