import {Id} from '@/convex/_generated/dataModel';
import {Card} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Check, User, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useMutationState} from '@/hooks/useMutationState';
import {api} from '@/convex/_generated/api';
import {toast} from 'sonner';
import {ConvexError} from 'convex/values';

type Props = {
  id: Id<'requests'>
  imageUrl: string
  username: string
  email: string
}

const Request = ({id, imageUrl, username, email}: Props) => {
  const {mutate: denyRequest, pending: denyPending} = useMutationState(
      api.request.deny);
  const {mutate: acceptRequest, pending: acceptPending} = useMutationState(
      api.request.accept);
  return (
      <Card
          className={'w-full p-2 flex flex-row items-center justify-between gap-2'}>
        <div className={'flex items-center gap-4 truncate'}>
          <Avatar>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback>
              <User/>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
              size={'icon'}
              disabled={denyPending || acceptPending}
              onClick={() => {
                acceptRequest({id}).
                    then(() => toast.success('Friend request accepted!')).
                    catch(error => toast.error(error instanceof ConvexError
                        ? error.data
                        : 'Unexpected error'));
              }}>
            <Check/>
          </Button>
          <Button
              size={'icon'}
              variant={'destructive'}
              disabled={denyPending || acceptPending}
              onClick={() => {
                denyRequest({id}).
                    then(() => toast.success('Friend request denied')).
                    catch(error => toast.error(error instanceof ConvexError
                        ? error.data
                        : 'Unexpected error'));
              }}>
            <X/>
          </Button>
        </div>
      </Card>
  );
};

export default Request;