import { Types } from "mongoose";

export interface User_Get{
        _id:Types.ObjectId,
        email:string,
        name: string,
        status: number,
        createdAt: string,
        updatedAt:string,
        _v: number  
}
export interface User_Find{
    total: number,
    limit: number,
    skip: number,
    // data:[ User_Get | null ],
    data:Array<User_Get | null>
}
// enum/
export enum User_Status{
    ACTIVE=1,
    DELETED=-1
}