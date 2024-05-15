import { makeAutoObservable } from "mobx";

import axios, { AxiosResponse } from "axios";

import { UserDTO } from "../models/UserDTO";
import AuthService from "../services/AuthService";
import $api from "../http";
import ProfileService from "../services/ProfileService";
import { ProfileDTO } from "../models/ProfileDTO";

import { UserInf } from "../models/UserInf";
export default class Store {
  user = {} as UserDTO;
  isAuth = false;

  userInfo = {} as UserInf;

  isConfirmEmail = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setConfirmEmail(bool: boolean) {
    this.isConfirmEmail = bool;
  }

  setUser(user: UserDTO) {
    this.user = user;
  }

  setUserInf(userInf: UserInf) {
    this.userInfo = userInf;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      this.setLoading(true);
      const response = await AuthService.login(email, password);
      console.log(response);

      localStorage.setItem("AccessToken", response.data.jwtToken);
      localStorage.setItem("refreshToken", response.data.jwtRefreshToken);

      this.setAuth(true);
      this.setUser(response.data.user);
      this.setLoading(false);
      return "okay";
    } catch (e: any) {
      console.log(e?.response?.data);
      this.setLoading(false);
      return e;
    }
  }

  async registration(email: string, password: string) {
    try {
      this.setLoading(true);
      const response = await AuthService.registration(email, password);
      console.log(response);

      localStorage.setItem("AccessToken", response.data.jwtToken);
      localStorage.setItem("refreshToken", response.data.jwtRefreshToken);

      this.setAuth(true);
      this.setUser(response.data.user);
      this.setLoading(false);
    } catch (e: any) {
      console.log(e?.response?.data);
      this.setLoading(false);
      return e;
    }
  }

  async logout() {
    try {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("refreshToken");

      this.setAuth(false);
      this.setUser({} as UserDTO);
    } catch (e) {
      console.log(e);
      console.log("Проблема с выходом");
    }
  }

  async checkAuth() {
    try {
      const response = await AuthService.checkAuth();
      console.log(response);

      this.setUserInf(response.data);

      console.log(this.userInfo);

      this.setUser({ email: response.data.username } as UserDTO);

      this.setAuth(true);
    } catch (error) {
      this.setAuth(false);
      this.setUser({} as UserDTO);
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("refreshToken");
      console.log(error);
    }
  }

  async confirmEmail(confirmCode: string) {
    try {
      const response = await AuthService.confirmEmail(confirmCode);
      console.log(response);
      this.setConfirmEmail(true);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async requestNewCode() {
    try {
      const response = await AuthService.requestNewCode();
      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async fieldProfile(profileDTO: ProfileDTO) {
    try {
      const response = await ProfileService.fieldProfile(profileDTO);
      console.log(response);
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  async uploadAvatar(file:any) {
    try {
      const response = await ProfileService.uploadAvatar(file);
      console.log(response);
    } catch (error:any) {
      console.log(error?.message);
    }
  }
}
