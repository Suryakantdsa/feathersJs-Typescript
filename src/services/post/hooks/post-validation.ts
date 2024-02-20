// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    const {data,app}=context
    const {user,title,description}=data;

    if(!user){
      throw new BadRequest("User is required")
    }
    if(!title){
      throw new BadRequest("User is required")
    }
    if(!description){
      throw new BadRequest("User is required")
    }
    await app.service("user").find(user).catch(()=>{
      throw new BadRequest("Invalid user..!")
    })
    return context;
  };
};
