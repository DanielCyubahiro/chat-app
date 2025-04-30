'use client';

import {Id} from '@/convex/_generated/dataModel';
import {Dispatch, SetStateAction} from 'react';
import {useMutationState} from '@/hooks/useMutationState';
import {api} from '@/convex/_generated/api';
import {toast} from 'sonner';
import {ConvexError} from 'convex/values';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Props = {
  conversationId: Id<'conversations'>,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

const LeaveGroupDialog = ({conversationId, setOpen, open}: Props) => {
  const {mutate: leaveGroup, pending} = useMutationState(
      api.conversation.leaveGroup);

  const handleLeaveGroup = async () => {
    leaveGroup({conversationId}).
        then(() => toast.success('Left group successfully.')).
        catch((error) => toast.error(error instanceof ConvexError
            ? error.data
            : 'Unexpected error occurred.'));

  };
  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will not be able to see previous
              messages or send new messages in this group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default LeaveGroupDialog;