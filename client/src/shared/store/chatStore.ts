import { action, makeAutoObservable, observable } from "mobx";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { io } from "socket.io-client";

import { MessageDTO } from "../models/chat/MessageDTO";
import $api from "../http";
import { ChatDTO } from "../models/chat/ChatDTO";
import ChatService from "../services/ChatService";
import { ChatEntity } from "../models/chat/ChatEntity";

const serverURL = "http://localhost:8081";

export default class ChatStore {
  socket = new SockJS(
    serverURL +
      "/ws?Authorization=Bearer " +
      localStorage.getItem("AccessToken")
  );

  stompClient = Stomp.over(this.socket);
  sender = "user";
  messages: MessageDTO[] = [];
  chats: ChatEntity[] = [];
  chatId: number = -1;
  chatUsers: string[] = [];
  isScrolling = false;

  setScrolling(bool:boolean) {
    this.isScrolling = bool;
  }



  constructor() {
    makeAutoObservable(this, {
      messages: observable,
      addMessage: action,
      deleteMessage: action,
      chats: observable,
      setChats: action,
      chatId: observable,
      setChatId: action,
    });
  }

  addMessage(message: MessageDTO) {
    if (this.chatId !== message.chatId) {
      const chat = this.chats.find(
        (chat) => chat.chatDTO.id === message.chatId
      );
      if (chat) {
        chat.unreadMessages += 1;
      }
    }

    this.messages.push(message);
  }

  async reconnect() {
    if (this.stompClient.connected) {
      this.stompClient.disconnect(() => {});
    }

    this.socket = new SockJS(
      serverURL +
        "/ws?Authorization=Bearer " +
        localStorage.getItem("AccessToken")
    );
    this.stompClient = Stomp.over(this.socket);

    this.connect(); // Подключение к новому соединению
  }

  async connect() {
    try {
      this.stompClient.connect({}, () => this.subscribe()); // исправлено здесь
    } catch (error) {}
  }

  private subscribe = async () => {
    try {
      this.stompClient.subscribe(
        "/user/queue/position-updates",
        (response: Stomp.Message) => {
          const message = JSON.parse(response.body);
          console.log(message);
          if (message?.type === "DELETE") {
            console.log("is subscribe messege with id  deleted");
            this.deleteMessage(message);
          } else {
            console.log(`in subscribe messege with id ${message.id} added`);

            this.addMessage(message);
            this.setScrolling(!this.isScrolling);
          }
        }
      );
    } catch (error) {}
  };

  async send(message: string, files: File[]) {
    try {
      var formData = new FormData();
      Array.from(files).map((value) => formData.append("file", value));
      if (!(files&&files.length>0)){
        formData.append("file", "");
      }
      formData.append("id", "0");
      formData.append("content", message);
      formData.append("sender", this.sender);
      formData.append("type", "CHAT");
      const response = await $api.post(
        serverURL + "/chat/send/" + this.chatId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    } catch (error) {}
  }

  async join(name: string) {
    this.sender = name;

    this.stompClient.send(
      "/app/chat/addUser",
      {},
      JSON.stringify({ sender: name, type: "JOIN" })
    );
  }

  getAll = async () => {
    try {
      const response = await $api.get(
        serverURL + "/chat/getAllMessages/" + this.chatId
      );
      const messagesData = response.data;

      messagesData.forEach((message: any) => {
        if (
          !this.messages.some(
            (existingMessage) => existingMessage.id === message.id
          )
        ) {
          this.addMessage(message);
        }
      });

      console.log(response.data);
    } catch (error) {}
  };

  delete = async (message: MessageDTO) => {
    try {
      const response = await $api.post(
        serverURL + "/chat/delete/" + message.id,
        {
          id: 0,
          content: message,
          sender: this.sender,
          type: "DELETE",
        }
      );

      console.log(`message with id ${message.id} was deleted`);
    } catch {}
  };

  deleteMessage(message: MessageDTO) {
    this.messages = this.messages.filter((msg) => msg.id !== message.id);
  }

  setChats = (chats: ChatEntity[]) => {
    this.chats = chats;
  };

  getAllChat = async () => {
    try {
      const allChats = await ChatService.getAllChat();
      const formattedChats = allChats.map((chatDTO) => ({
        chatDTO,
        unreadMessages: 0, // Установите здесь количество непрочитанных сообщений
      }));
      this.setChats(formattedChats);
      console.log(allChats);
      if (this.chatId === -1 && formattedChats.length > 0) {
        this.chatId = formattedChats[0].chatDTO.id;
      }
    } catch (error) {
      console.error(error);
    }
  };

  setChatId = (chatId: number) => {
    this.chatId = chatId;

    const chat = this.chats.find((chat) => chat.chatDTO.id === chatId);
    if (chat) {
      chat.unreadMessages = 0;
    }
    const user1 = chat?.chatDTO.user1 || "";
    const user2 = chat?.chatDTO.user2 || "";
    console.log({ user1, user2 });

    this.chatUsers = [user1, user2];
  };

  getChat = (chatId: number) => {
    return this.chats.find((chat) => chat.chatDTO.id === this.chatId);
  };
}
