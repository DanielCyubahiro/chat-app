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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import {CirclePlus} from 'lucide-react';

type Props = {}

const createGroupFormValidation = z.object({
  name: z.string().min(1, {message: 'A name is required'}),
  members: z.string().
      array().
      min(1, {message: 'You must select at-least one member'}),

});
const CreateGroupDialog = ({}: Props) => {
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
        </DialogContent>
      </Dialog>
  );
};

export default CreateGroupDialog;