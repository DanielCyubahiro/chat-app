import {internalMutation, internalQuery} from '@/convex/_generated/server';
import {v} from 'convex/values';

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', args);
  },
});

export const getUser = internalQuery({
  args: {clerkId: v.string()},
  handler: async (ctx, args) => {
    return ctx.db.
        query('users').
        withIndex('by_clerkId', q => q.eq('clerkId', args.clerkId)).
        unique();
  },
});

export const updateUser = internalMutation({
  args: {
    id: v.id('users'),
    username: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      username: args.username,
      imageUrl: args.imageUrl,
      email: args.email,
    });
  },
});