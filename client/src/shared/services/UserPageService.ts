import { AxiosResponse } from "axios";

import $api, { API_URL } from "../http";
import { PostDTO } from "../models/userPage/PostDTO";
import { CreatePostDTO } from "../models/userPage/CreatePostDTO";
import { UPProfileDTO } from "../models/userPage/UPProfileDTO";

export default class UserPageService {

  static async getProfileInfo(email: string): Promise<UPProfileDTO> {
    const response = await $api.get<UPProfileDTO>(`/post/getProfile/${email}`);
    return response.data;
  }

  static async getAllPosts(email: string): Promise<PostDTO[]> {
    const response = await $api.get<PostDTO[]>(`/post/getAllPosts/${email}`);
    return response.data;
  }

  static async deletePost(postId:number): Promise<PostDTO[]> {
    const response = await $api.get<PostDTO[]>(`/post/deletePost/${postId}`);
    return response.data;
  }

  static async likePost(postId:number): Promise<PostDTO[]> {
    const response = await $api.get<PostDTO[]>(`/post/likePost/${postId}`);
    return response.data;
  }

  static async deleteLikePost(postId:number): Promise<PostDTO[]> {
    const response = await $api.get<PostDTO[]>(`/post/deleteLikePost/${postId}`);
    return response.data;
  }

  static async makePost(email: string, data: CreatePostDTO) {

    var formData = new FormData();
    const files = data.files;

    Array.from(files).map((value) => formData.append("file", value));
    if (!(files&&files.length>0)){
      formData.append("file", "");
    }
    formData.append("content", data.content);

    return $api.post(
      "/post/makePost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}
