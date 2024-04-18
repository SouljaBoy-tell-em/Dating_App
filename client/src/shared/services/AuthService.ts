import { AxiosResponse } from "axios";

import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
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

  static async checkAuth() {
    return $api.get<string>("/example");
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
