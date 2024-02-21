// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {data,params,app}=context
    const {post , comment}=data
    data.user=params?.user?._id
    if(!post){
      throw new BadRequest("Post Id is requiered")
    }
    if(!comment){
      throw new BadRequest("Comment Field is requied")
    }
    await app.service("post").get(post).catch(()=>{
      throw new BadRequest("Invaild post")
    })
    return context;
  };
};
