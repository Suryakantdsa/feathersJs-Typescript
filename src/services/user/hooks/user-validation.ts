import { BadRequest } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";
import { UserSchema, arryObj } from "../../../Schema/UserSchema";
import { validateWithZod } from "../../../utils/validateWithZod"

export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    // Perform Zod validation using the generic validateWithZod function
    // const validation = validateWithZod(UserSchema, data);
    const validation = validateWithZod(arryObj, data);
    if (!validation.success) {
      // If validation fails, throw a BadRequest error with the structured errors
      throw new BadRequest("Validation failed", { errors: validation.errors });
    }

    // If validation is successful, proceed with the updated data
    context.data = validation.data;

    return context;
  };
};
