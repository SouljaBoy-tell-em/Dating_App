import { action, makeAutoObservable, observable } from "mobx";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { io } from "socket.io-client";

import { MessageDTO } from "../models/MessageDTO";
import $api from "../http";
import { ChatDTO } from "../models/ChatDTO";
import ChatService from "../services/ChatService";

export default class ChatStore {
  socket = new SockJS(
    "http://localhost:8081/ws?Authorization=Bearer " +
      localStorage.getItem("AccessToken")
  );
  stompClient = Stomp.over(this.socket);
  sender = "user";
  messages: MessageDTO[] = [];
  chats: ChatDTO[] = [];
  chatId: number = -1;
  chatName: string = "Выберите чат";

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
    this.messages.push(message);
  }

  async connect() {
    this.stompClient.connect({}, () => this.subscribe()); // исправлено здесь
  }

  private subscribe = async () => {
    this.stompClient.subscribe(
      "/user/queue/position-updates",
      (response: Stomp.Message) => {
        const message = JSON.parse(response.body);
        console.log(message);
        if (message?.type === "DELETE") {
          console.log(`is subscribe messege with id  deleted`);
          this.deleteMessage(message);
        } else {
          console.log(`in subscribe messege with id ${message.id} added`);

          this.addMessage(message);
        }
      }
    );
  };

  async send(message: string) {
    try {
      const response = await $api.post(
        "http://localhost:8081/chat/send/" + this.chatId,
        {
          id: 0,
          content: message,
          sender: this.sender,
          type: "CHAT",
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
        "http://localhost:8081/chat/getAllMessages/" + this.chatId
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
        "http://localhost:8081/chat/delete/" + message.id,
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

  setChats = (chats: ChatDTO[]) => {
    this.chats = chats;
  };

  getAllChat = async () => {
    try {
      const allChats = await ChatService.getAllChat();
      this.setChats(allChats);
      console.log(allChats);
      if (this.chatId === -1) {
        this.chatId = this.chats[0].id;
      }
    } catch (error) {}
  };

  setChatId = (chatId: number) => {
    this.chatId = chatId;
    const user1 =
      this.chats.find((chat) => chat.id === this.chatId)?.user1 || "";
    const user2 =
      this.chats.find((chat) => chat.id === this.chatId)?.user2 || "";
    this.chatName = user1 + " " + user2;
  };
}
