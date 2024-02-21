// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";
import { Like_Find } from "../interface/likeInterface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data, id, params, app } = context;
    const { post } = data;
    // console.log(params?.user?._id)
    
    data.user=params?.user?._id
    data.status=1

    if (!post) {
      throw new BadRequest("Invalid PostId");
    }
    await app
      .service("post")
      ._get(post)
      .catch(() => {
        throw new BadRequest("Post is Invalid");
      });

    await app
      .service("like")
      ._find({
        query: {
          user: params?.user?._id,
          post,
          status: 1,
        },
        // make interface
      })
      .then((res:Like_Find) => {
        if (res.total) {
          throw new BadRequest("You have already liked post...!");
        }
      });
    return context;
  };
};
