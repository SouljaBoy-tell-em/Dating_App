import { makeAutoObservable } from "mobx";

import { UserDTO } from "../models/UserDTO";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

export default class Store {
  user = {} as UserDTO;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserDTO) {
    this.user = user;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      console.log(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log("Проблема с авторизацией");
    }
  }

  async registration(username: string, password: string, email: string) {
    try {
      const response = await AuthService.registration(
        username,
        password,
        email
      );
      localStorage.setItem("token", response.data.accessToken);
      console.log(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log("Проблема с регистрацией");
    }
  }

  async logout() {
    try {
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as UserDTO);
    } catch (e) {
      console.log("Проблема с регистрацией");
    }
  }

  async checkAuth() {
    try {
      const response = await UserService.getInfo();
      console.log(response);
      this.setUser({ username: response.data.username } as UserDTO);

      this.setAuth(true);
    } catch (error) {
      this.setAuth(false);
      this.setUser({} as UserDTO);
      localStorage.removeItem("token");
      console.log(error);
    }
  }
}
