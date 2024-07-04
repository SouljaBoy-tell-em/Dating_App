import $api from "../http";
import { FilterData } from "../models/swiper/FilterData";
import { SwiperUserDTO } from "../models/swiper/SwiperUserDTO";

export default class SwiperService {
  static async ratePerson(
    likedEmail: string,
    isLike: boolean
  ): Promise<string> {
    const response = await $api.post("/swiper/grade", { likedEmail, isLike });
    return response.data;
  }
  static async getUsersForSwiper(
    filtedSet: FilterData
  ): Promise<SwiperUserDTO[]> {
    return (
      await $api.get(
        `/swiper?startAge=${filtedSet.ageFrom}&endAge=${
          filtedSet.ageTo
        }&gender=${filtedSet.sex}`
      )
    ).data;
  }
}
