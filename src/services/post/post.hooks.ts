import { HookContext, HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import postValidation from './hooks/PostValidation';
import checkPostIdentity from './hooks/CheckPostIdentity';
import isLiked from './hooks/IsLiked';
import { discard } from 'feathers-hooks-common';
import IsCommented from './hooks/IsCommented';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      // async(context: HookContext)=>{




      // },
      postValidation()
    ],
    update: [],
    patch: [checkPostIdentity(),discard("likeCount","commentCount")],
    remove: [checkPostIdentity()]
  },

  after: {
    all: [],
    find: [isLiked(),IsCommented()],
    get: [],
    create: [],
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
