import { makeAutoObservable } from "mobx";

import { SwiperUserDTO } from "../models/swiper/SwiperUserDTO";
import SwiperService from "../services/SwiperService";

export default class SwiperStore {
  users: SwiperUserDTO[] = [];
  currentId: number = 0;

  order: number[] = [0, 1, 1];

  constructor() {
    makeAutoObservable(this);
  }

  next() {
    if (this.order.length > 0) {
      const last = this.order.pop()!;
      this.order.unshift(last);
    }
  }

  prev() {
    if (this.order.length > 0) {
      const first = this.order.shift()!;
      this.order.push(first);
    }
  }

  setUsers(users: SwiperUserDTO[]) {
    this.users = users;
  }

  setCurrentId(currentId: number) {
    this.currentId = currentId;
  }

  getUsers = async () => {
    try {
      const response = await SwiperService.getUsersForSwiper();
      console.log(response);
      this.setUsers(response);
    } catch (error: any) {
      console.log(error?.message?.data);
    }
  };

  ratePerson = async (email: string, isLike: boolean) => {
    try {
      const response = await SwiperService.ratePerson(email, isLike);

    } catch (error: any) {
      console.log(error?.message?.data);
    }
  };

  getHamachiUrl(url: string) {
    return "http://25.47.247.34:8081" + url.substring(21);
  }
}
