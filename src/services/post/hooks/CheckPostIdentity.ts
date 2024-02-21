// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest, FeathersError } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";
import { Post_Get } from "../interface/postInterface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data, params, id, app } = context;
    const { title, description } = data;
    const {user } = params;
    
   
    if (data.user) {
      throw new BadRequest("userId can't be Updated");
    }

    await app
      .service("post")
      .get(id)
      .then((res: Post_Get) => {
        const { user: userId } = res;
        // console.log(user);
        if(user){
          const {_id}=user
          if (userId.toString() !== _id.toString()) {
            throw new BadRequest("You have not the permission to access");
          }
        }
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err.message);
      });

    return context;
  };
};
