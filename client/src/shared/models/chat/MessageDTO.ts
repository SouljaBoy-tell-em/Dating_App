import { MessageFileDTO } from "./MessageFileDTO";
import { MessageType } from "./MessageType";
import { SenderDTO } from "./SenderDTO";

export interface MessageDTO {
    id:number;
    content:string;
    sender:SenderDTO;
    time:string;
    type: string;
    chatId:number;
    files:MessageFileDTO[];
}
