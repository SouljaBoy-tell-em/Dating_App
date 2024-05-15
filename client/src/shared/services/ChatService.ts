import { AxiosResponse } from "axios";

import $api from "../http";
import { ChatDTO } from "../models/chat/ChatDTO";

export default class ChatService {
  static async getAllChat(): Promise<ChatDTO[]> {
    const response = await $api.get<ChatDTO[]>("/chat/getAllMyChats");
    return response.data;
  }
  static async createNewChat(email: string) {
    return $api.post("/chat/createNewChat", { email });
  }
}
