// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {data}=context
    const {email,name,password}=data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      throw new BadRequest("Email is not vaild")
    }
    if(email){
      throw new BadRequest("Email is required")
    }
    if(password){
      throw new BadRequest("Email is required")
    }
    if(name){
      throw new BadRequest("Email is required")
    }
    return context;
  };
};
