import {Card} from '@/components/ui/card';
import {z} from 'zod';
import {useConversation} from '@/hooks/useConversation';
import {useMutationState} from '@/hooks/useMutationState';
import {api} from '@/convex/_generated/api';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {ConvexError} from 'convex/values';
import React from 'react';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import TextareaAutosize from 'react-textarea-autosize';
import {Button} from '@/components/ui/button';
import {SendHorizonal} from 'lucide-react';

const chatMessageValidation = z.object({
  content: z.string().min(1),
});

const ChatInput = () => {
  const {conversationId} = useConversation();
  const {mutate: createMessage, pending} = useMutationState(api.message.create);
  const form = useForm<z.infer<typeof chatMessageValidation>>({
        resolver: zodResolver(chatMessageValidation),
        defaultValues: {
          content: '',
        },
      },
  );

  const handleSubmit = async (values: z.infer<typeof chatMessageValidation>) => {
    createMessage({
      conversationId,
      type: 'text',
      content: [values.content],
    }).
        then(() => form.reset()).
        catch(error => {
          toast.error(error instanceof ConvexError
              ? error.data
              : 'Unexpected error occurred.');
        });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLTextAreaElement>) => {
    const {value, selectionStart} = event.target as HTMLTextAreaElement;
    if (selectionStart !== null) {
      form.setValue('content', value);
    }
  };

  const handlePressEnterKey = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await form.handleSubmit(handleSubmit)();
    }
  };

  return (
      <Card className={'w-full p-2 rounded-lg relative'}>
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={'flex gap-2 items-end w-full'}>
            <FormField
                control={form.control}
                name={'content'}
                render={({field}) => (
                    <FormItem className={'h-full w-full'}>
                      <FormControl>
                        <TextareaAutosize
                            onKeyDown={handlePressEnterKey}
                            rows={1}
                            maxRows={3}
                            {...field}
                            onChange={handleInputChange}
                            onClick={handleInputChange}
                            placeholder={'Type a message...'}
                            className={'min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'}
                        />
                      </FormControl>
                    </FormItem>
                )}/>
            <Button disabled={pending} type="submit" size={'icon'}>
              <SendHorizonal/>
            </Button>
          </form>
        </Form>
      </Card>
  );
};

export default ChatInput;