import { action, makeAutoObservable, observable } from "mobx";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { MessageDTO } from "../models/MessageDTO";
import axios from "axios";

export default class ChatStore {
  socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(this.socket);
  sender = "user";


  messages: MessageDTO[] = [];

  constructor() {
    makeAutoObservable(this, {
      messages: observable,
      addMessage: action,
      deleteMessage: action,
    });
  }

  addMessage(message: MessageDTO) {
    this.messages.push(message);
  }

  async connect() {
    this.stompClient.connect({}, () => this.subscribe()); // исправлено здесь
  }

  private subscribe = async () => {
    // использование стрелочной функции
    this.stompClient.subscribe("/topic/public", (response: Stomp.Message) => {
      const message = JSON.parse(response.body);
      if (message?.body?.type === "DELETE") {
        console.log(`is subscribe messege with id  deleted`);
        this.deleteMessage(message.body);
      } else {
        console.log(`in subscribe messege with id ${message.id} added`);

        this.addMessage(message);
      }
    });
  };

  async send(message: string) {
    this.stompClient.send(
      "/app/chat.sendMessage",
      {},
      JSON.stringify({ id: 0, content: message, sender: this.sender, type: "CHAT" })
    );
  }

  async join(name: string) {  

    this.sender = name;

    this.stompClient.send(
      "/app/chat.addUser",
      {},
      JSON.stringify({ sender: name, type: "JOIN" })
    );
  }

  getAll = async () => {
    const response = await axios.get("http://localhost:8080/chat.getAll");
    const messagesData = response.data;

    messagesData.forEach((message: any) => {
      if (!this.messages.some((existingMessage) => existingMessage.id === message.id)) {
        this.addMessage(message);
      }
    });

    console.log(response.data);
  };

  delete = async (message: MessageDTO) => {
    try {
      this.stompClient.send(
        "/app/chat.deleteMessage",
        {},
        JSON.stringify({
          id: message.id,
          content: message.content,
          sender: this.sender,
          type: "DELETE",
        })
      );
      console.log(`message with id ${message.id} was deleted`);
    } catch {}
  };

  deleteMessage(message: MessageDTO) {
    this.messages = this.messages.filter((msg) => msg.id !== message.id);
  }

  
}
