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

const DeleteGroupDialog = ({conversationId, setOpen, open}: Props) => {
  const {mutate: deleteGroup, pending} = useMutationState(
      api.conversation.deleteGroup);

  const handleDeleteGroup = async () => {
    deleteGroup({conversationId}).
        then(() => toast.success('Group deleted successfully.')).
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
              This action cannot be undone. All messages will be deleted and you
              will not be able to message in this group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default DeleteGroupDialog;