import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import userValidation from '../user/hooks/user-validation';
import notToUpdate from '../user/hooks/not-to-update';
import checkUserIdienty from './hooks/check-user-idienty';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ userValidation(),hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      notToUpdate(),
      checkUserIdienty()
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
     
    ],
    find: [
      // (ctx:HookContext)=>{console.log(ctx)}
    ],
    get: [
      // (ctx:HookContext)=>{console.log(ctx?.params?.authentication?.user?.password)}
    ],
    create: [ ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
