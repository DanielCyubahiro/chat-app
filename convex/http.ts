import {httpRouter} from 'convex/server';
import {httpAction} from '@/convex/_generated/server';
import {WebhookEvent} from '@clerk/backend';
import {Webhook} from 'svix';
import {internal} from '@/convex/_generated/api';

const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  };
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  try {
    return webhook.verify(payload, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error('Clerk webhook verification failed:', error);
    return;
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);
  if (!event) {
    return new Response('Could not validate Clerk payload', {status: 400});
  }

  switch (event.type) {
    case 'user.created':
      await ctx.runMutation(internal.user.createUser, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });
      break;

    case 'user.updated':
      const user = await ctx.runQuery(internal.user.getUser, {
        clerkId: event.data.id,
      });

      if (user) {
        // Update existing user
        await ctx.runMutation(internal.user.updateUser, {
          id: user._id,
          username: `${event.data.first_name} ${event.data.last_name}`,
          imageUrl: event.data.image_url,
          email: event.data.email_addresses[0].email_address,
        });
      } else {
        // Create if doesn't exist
        await ctx.runMutation(internal.user.createUser, {
          username: `${event.data.first_name} ${event.data.last_name}`,
          imageUrl: event.data.image_url,
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
        });
      }
      break;
    default:
      console.error('Clerk webhook event not supported', event.type);
  }

  return new Response(null, {status: 200});
});

const http = httpRouter();
http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
});

export default http;