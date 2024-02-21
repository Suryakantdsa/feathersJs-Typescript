// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest, NotAuthenticated } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data, app, params } = context;
    const { title, description } = data;
    const { user } = params;

    if (user) {
      data.user = params.user?._id;
      // throw new BadRequest("User is required")
    } else {
      throw new NotAuthenticated();
    }
    if (!title) {
      throw new BadRequest("title is required");
    }
    if (!description) {
      throw new BadRequest("User is required");
    }

    return context;
  };
};
