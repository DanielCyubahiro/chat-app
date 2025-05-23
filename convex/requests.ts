import {query} from '@/convex/_generated/server';
import {getUserByClerkId} from '@/convex/_utils';
import {ConvexError} from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const requests = await ctx.db.
        query('requests').
        withIndex('by_receiver', q => q.eq('receiver', currentUser._id)).
        collect();

    return await Promise.
        all(requests.map(async request => {
          const sender = await ctx.db.get(request.sender);
          if (!sender) {
            throw new ConvexError('Request sender not found');
          }
          return {sender, request, requestCount: requests.length};
        }));
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthorized');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const requests = await ctx.db.
        query('requests').
        withIndex('by_receiver', q => q.eq('receiver', currentUser._id)).
        collect();

    return requests.length;
  },
});
