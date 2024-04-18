import { MessageType } from "./MessageType";

export interface MessageDTO {
    id:number,
    content:string,
    sender:string,
    type: string;
}
