import {query} from '@/convex/_generated/server';
import {getUserByClerkId} from '@/convex/_utils';
import {ConvexError, v} from 'convex/values';

export const get = query({
  args: {
    id: v.id('conversations'),
  },
  handler: async (ctx, args) => {
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

    const membership = await ctx.db.
        query('conversationMembers').
        withIndex('by_memberId_conversationId',
            q => q.
                eq('memberId', currentUser._id).
                eq('conversationId', args.id)).
        unique();
    if (!membership) {
      throw new ConvexError('You are not a member of this conversation');
    }

    const messages = await ctx.db.
        query('messages').
        withIndex('by_conversationId', q => q.eq('conversationId', args.id)).
        order('desc').
        collect();

    return Promise.all(
        messages.map(async message => {
          const messageSender = await ctx.db.get(message.senderId);
          if (!messageSender) {
            throw new ConvexError('Could not find sender of message');
          }

          return {
            message,
            senderImage: messageSender.imageUrl,
            senderName: messageSender.username,
            isCurrentUser: messageSender._id === currentUser._id,
          };
        }),
    );
  },
});