import { HookContext } from "@feathersjs/feathers";
import { Like_Find, Like_Get } from "../interface/likeInterface";

const OnPostLiked=async(result:Like_Get,context: HookContext)=>{
    const {post}=result
    const {app}=context
    const likeCount=await app.service("like").find({
        query:{
            post,
            status:1
        }
    }).then((res:Like_Find)=>res.total)
    await app.service("post")._patch(post,{likeCount})
}

export default OnPostLiked