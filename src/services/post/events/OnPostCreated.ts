import { HookContext } from "@feathersjs/feathers";
import { Post_Find, Post_Get } from "../interface/postInterface";

const OnPostCreated=async(result:Post_Get,context:HookContext)=>{
    const {user:UserId}=result
    const {app}=context
    const blogCount=await app.service("post").find({
        query:{
            UserId,
            status:1
        }
    })
    .then((res:Post_Find)=>{
        return res.total
    })
    // console.log(blogCount)
    await app.service("user")._patch(UserId,{blogCount})
}

export default OnPostCreated