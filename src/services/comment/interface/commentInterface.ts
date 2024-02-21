import { Types } from "mongoose";

export interface Comment_Get{ 
    user: Types.ObjectId,
    post: Types.ObjectId,
    comment: string,
    _id: Types.ObjectId,
    createdAt: string,
    updatedAt: string,
    _v: number
}
export interface Comment_Find{
    total: number,
    limit: number,
    skip: number,
    data:[Array<Comment_Get | null> ]
}