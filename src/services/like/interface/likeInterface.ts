import { Types } from "mongoose";

export interface Like_Find{
    total: number,
    limit: number,
    skip: number,
    data:[Array<Like_Get | null> ]
}
export interface Like_Get{   
    user: Types.ObjectId,
    post: Types.ObjectId,
    status: number,
    _id: Types.ObjectId,
    createdAt: string,
    updatedAt: string,
    _v: number
}