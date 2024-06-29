import { AxiosResponse } from "axios";

import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { UserInf } from "../models/UserInf";
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/auth/register", {
      email,
      password,
    });
  }

  static async checkAuth() : Promise<AxiosResponse<UserInf>> {
    return $api.get<UserInf>("/auth/info");
  }

  static async confirmEmail(confirmCode: string) {
    return $api.post<string>("/auth/confirm", {
      confirmCode,
    });
  }

  static async requestNewCode() {
    return $api.get<string>("/auth/reconfirm");
  }
}
