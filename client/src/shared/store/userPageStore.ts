import { makeAutoObservable } from "mobx";

import { PostDTO } from "../models/userPage/PostDTO";
import UserPageService from "../services/UserPageService";
import { CreatePostDTO } from "../models/userPage/CreatePostDTO";
import { ProfileDTO } from "../models/ProfileDTO";
import { UPProfileDTO } from "../models/userPage/UPProfileDTO";

export default class UserPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  Posts: PostDTO[] = [];
  email: string = "";
  profileInfo: UPProfileDTO = {} as UPProfileDTO;
  setEmail(email: string) {
    this.email = email;
  }

  getAllPosts = async () => {
    try {
      const posts = await UserPageService.getAllPosts(this.email);
      this.Posts = posts;
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  getProfileInfo = async () => {
    try {
      const profileInfo = await UserPageService.getProfileInfo(this.email);
      this.profileInfo = profileInfo;
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  }; 

  makePost = async (text:string, files:File[]) => {
    try {

      await UserPageService.makePost(this.email, {content:text, files:files});
      this.getAllPosts();
    } catch (error) {
    }
  };

  deletePost = async(postId:number) => {
    try {
      await UserPageService.deletePost(postId);
      this.getAllPosts();
    } catch (error) {
    }
  };
  likePost = async(postId:number) => {
    try {
      await UserPageService.likePost(postId);
      this.getAllPosts();
    } catch (error) {
    }
  };
  deleteLikePost = async(postId:number) => {
    try {
      await UserPageService.deleteLikePost(postId);
      this.getAllPosts();
    } catch (error) {
    }
  };
}
