import db from "../database/database";


export const hasRole = (role: string) => next => async (root, args, context, info) => {
    if (!context.currentUser) {
      throw new Error('You are not authenticated!');
    }
    const userRoles = context.currentUser.roles;
    const role_find = await db.select('*').from('roles').whereIn('name', userRoles).first();
    if (!role) {
        throw new Error('You are not authorized!');
    }
    if (role === role_find.name) {
        return next(root, args, context, info);
    }
    throw new Error('You are not authorized!');
}

export const isAuthenticated = () => next => async (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error('You are not authenticated!');
  }
  return next(root, args, context, info);
}