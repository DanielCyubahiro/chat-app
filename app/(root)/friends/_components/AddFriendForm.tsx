'use client';

import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import {UserPlus} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

type Props = object

const addFriendFormSchema = z.object({
  email: z.
      string().
      email('Please enter a valid email address').
      min(1, {message: 'This field cannot be empty'}),
});

const AddFriendForm = ({}: Props) => {
  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: '',
    },
  });
  const handleSubmit = () => {

  };
  return (
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" asChild>
              <DialogTrigger>
                <UserPlus/>
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a friend</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Friend
            </DialogTitle>
            <DialogDescription>
              Send a request to connect with your friends!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={'space-y-8'}
            >
              <FormField
                  name={'email'}
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder={'Email'} {...field}/>
                        </FormControl>
                      </FormItem>
                  )}
              />
              <DialogFooter>
                <Button disabled={false} type="submit">
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
};

export default AddFriendForm;