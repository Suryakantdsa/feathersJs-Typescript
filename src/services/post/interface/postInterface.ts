import { Types } from "mongoose"

export interface Post_Get {
        _id:Types.ObjectId,
        user:Types.ObjectId ,
        title: string,
        description: string,
        likeCount: number,
        commentCount: number,
        createdAt: string,
        updatedAt: string,
        _v: number
}
export interface Post_Post {
        user:Types.ObjectId ,
        title: string,
        description: string,
        likeCount?: number,
        commentCount?: number,
}
export interface Post_Patch {
        user?:Types.ObjectId ,
        title?: string,
        description?: string,
        likeCount?: number,
        commentCount?: number,
}
export interface Post_Find {
    total: number,
    limit: number,
    skip: number,
    data:[Array<Post_Get | null> ]
    
}