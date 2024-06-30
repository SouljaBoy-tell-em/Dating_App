import { StringLiteral } from "typescript";

export interface UserInf{
    username:string;
    role:string;
    confirmed:boolean;
    likedUsersId:number;
    firstName:string;
    lastName:string;
    birthDate:string;
    profileFilled:boolean;
}