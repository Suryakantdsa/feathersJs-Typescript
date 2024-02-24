import { HookContext } from "@feathersjs/feathers";
import { CoverImg_Post } from "../interface/uploadCoverImgInterface";

const OnCoverImgUploaded=async(res:CoverImg_Post,context:HookContext)=>{
    const {app,params}=context;
    const {user}=params
    let {path}=res
    
    if(Array.isArray(path)){
        path=path[0]
    }

    await app.service("user")._patch(user?._id,{coverImgUrl:path})

}
export default OnCoverImgUploaded