// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {id,params}=context
    const {user}=params
    if(user){
        if(user?._id.toString()!==id?.toString()){
          throw new BadRequest("U are not allowed for the update acnt details")
        }
    }else{
      throw new NotAuthenticated()
    }
    return context;
  };
};
