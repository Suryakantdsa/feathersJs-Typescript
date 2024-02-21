// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { Post_Find } from "../interface/postInterface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { result, app } = context;
    const { data } = result;
    for (let i = 0; i < data.length; i++) {
      data[i].like = await app
        .service("like")
        .find({
          query: {
            post: data[i]._id,
          },
        })
        .then((res: Post_Find) => {
          return res.total ? res.data : null;
        });
    }

    return context;
  };
};
