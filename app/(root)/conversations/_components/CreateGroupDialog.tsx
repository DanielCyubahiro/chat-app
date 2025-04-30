'use client';

import {z} from 'zod';
import {useQuery} from 'convex/react';
import {api} from '@/convex/_generated/api';
import {useMutationState} from '@/hooks/useMutationState';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMemo} from 'react';
import {toast} from 'sonner';
import {ConvexError} from 'convex/values';
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
import {CirclePlus, X} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Card} from '@/components/ui/card';

const createGroupFormValidation = z.object({
  name: z.string().min(1, {message: 'A name is required'}),
  members: z.string().
      array().
      min(1, {message: 'You must select at-least one member'}),

});
const CreateGroupDialog = () => {
  const friends = useQuery(api.friends.get);
  const {mutate: createGroup, pending} = useMutationState(
      api.friends.createGroup);
  const form = useForm<z.infer<typeof createGroupFormValidation>>({
    resolver: zodResolver(createGroupFormValidation),
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = form.watch('members', []);
  const unselectedFriends = useMemo(() => friends
      ? friends.filter(friend => !members.includes(friend._id))
      : [], [members.length, friends?.length]);

  const handleSubmit = async (values: z.infer<typeof createGroupFormValidation>) => {
    await createGroup({name: values.name, members: values.members}).
        then(() => {
          form.reset();
          toast.success('Group created successfully!');
        }).
        catch((error) => {
          toast.error(error instanceof ConvexError
              ? error.data
              : 'Unexpected error occured');
        });
  };

  return (
      <Dialog>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'outline'}>
                <CirclePlus/>
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Create Group</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className={'block'}>
          <DialogHeader>
            <DialogTitle>
              Create Group
            </DialogTitle>
            <DialogDescription>
              Add your friend to get started
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={'space-y-8'}
            >
              <FormField
                  name={'name'}
                  control={form.control}
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                              placeholder={'Group name...'}
                              {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}/>
              <FormField
                  name={'members'}
                  control={form.control}
                  render={() => (
                      <FormItem>
                        <FormLabel>Friends</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                disabled={unselectedFriends.length === 0}
                            >
                              <Button className={'w-full'} variant={'outline'}>
                                Select
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={'w-full'}>
                              {unselectedFriends.map(friend => (
                                  <DropdownMenuCheckboxItem
                                      key={friend._id}
                                      className={'flex items-center gap-2 w-full p-2'}
                                      onCheckedChange={checked => {
                                        if (checked) {
                                          form.setValue('members',
                                              [...members, friend._id]);
                                        }
                                      }}
                                  >
                                    <Avatar className={'w-8 h-8'}>
                                      <AvatarImage src={friend.imageUrl}/>
                                      <AvatarFallback>
                                        {friend.username.substring(0, 1)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <h4 className={'truncate'}>
                                      {friend.username}
                                    </h4>
                                  </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}/>
              {members && members.length
                  ? (
                      <Card
                          className={'w-full flex items-center gap-3 overflow-x-auto h-24 p-2 no-scrollbar'}>
                        {friends?.filter(
                            friend => members.includes(friend._id)).
                            map(friend => (
                                <div
                                    key={friend._id}
                                    className={'flex items-center gap-1 flex-col'}
                                >
                                  <div className={'relative mt-5'}>
                                    <Avatar className={'w-8 h-8'}>
                                      <AvatarImage src={friend.imageUrl}/>
                                      <AvatarFallback>
                                        {friend.username.substring(0, 1)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <X className={'text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer'}/>
                                  </div>
                                  <p className={'truncate text-sm'}>
                                    {friend.username.split(' ')[0]}
                                  </p>
                                </div>
                            ))}
                      </Card>
                  )
                  : null
              }
              <DialogFooter>
                <Button disabled={pending} type={'submit'}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
};

export default CreateGroupDialog;