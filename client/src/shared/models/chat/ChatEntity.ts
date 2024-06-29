import { ChatDTO } from "./ChatDTO";

export interface ChatEntity{
    chatDTO : ChatDTO;
    unreadMessages : number;
}