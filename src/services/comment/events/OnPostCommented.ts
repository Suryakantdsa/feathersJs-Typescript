import { HookContext } from "@feathersjs/feathers";
import { Comment_Get } from "../interface/commentInterface";

const OnPostCommented=async(result:Comment_Get,context:HookContext)=>{

    const {post:postId}=result;
    const {app}=context

    const commentCount=await app.service("comment").find({
        query:{
            postId,
            status:1
        }
    })

    await app.service("post")._patch(postId,{commentCount})

}
export default OnPostCommented