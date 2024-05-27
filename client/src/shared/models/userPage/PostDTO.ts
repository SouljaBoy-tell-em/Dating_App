import { FileDTO } from "../files/FileDTO";

export interface PostDTO{
    id:number;
    content:string;
    email:string;
    time:string;
    files:FileDTO[];
    liked:boolean;
    likeNumber:number;

}