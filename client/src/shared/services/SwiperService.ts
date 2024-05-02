import $api from "../http";
import { SwiperUserDTO } from "../models/swiper/SwiperUserDTO";

export default class SwiperService {
  static async ratePerson(likedEmail:string, isLike:boolean): Promise<string> {
    const response = await $api.post("/swiper/grade", {likedEmail, isLike});
    return response.data;
  }
  static async getUsersForSwiper() : Promise<SwiperUserDTO[]>  {
    return (await $api.get("/swiper")).data;
  }
}
