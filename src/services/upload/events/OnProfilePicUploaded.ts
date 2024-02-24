import { HookContext } from "@feathersjs/feathers";
import { Upload_On } from "../interface/uploadInterface";
import { NotAuthenticated } from "@feathersjs/errors";

const OnProfilePicUploaded=async(res:Upload_On,context:HookContext)=>{
    let {path}=res;
    const {app,params}=context
    const { user } = params;
    // console.log(res)
    if(Array.isArray(path)){
        path=path[0]
    }
    if (user) {
      // throw new BadRequest("User is required")
      await app.service("user")._patch(user?._id,{profileUrl:path})
    } else {
      throw new NotAuthenticated();
    }

}
export default OnProfilePicUploaded