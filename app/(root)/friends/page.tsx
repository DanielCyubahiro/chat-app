'use client';

import ItemList from '@/components/shared/item-list/ItemList';
import ConversationFallback
  from '@/components/shared/conversation/ConversationFallback';
import AddFriendForm from '@/app/(root)/friends/_components/AddFriendForm';
import {useQuery} from 'convex/react';
import {api} from '@/convex/_generated/api';
import Request from '@/app/(root)/friends/_components/Request';
import {Loader2} from 'lucide-react';

type Props = object
const FriendsPage = ({}: Props) => {
  const requests = useQuery(api.requests.get);
  return (
      <>
        <ItemList title={'Friends'} action={<AddFriendForm/>}>
          {requests
              ? requests.length === 0
                  ? <p
                      className={'w-full h-full flex items-center justify-center'}>
                    No friend requests
                  </p>
                  : requests.map(request => (
                      <Request
                          key={request.request._id}
                          id={request.request._id}
                          imageUrl={request.sender.imageUrl}
                          username={request.sender.username}
                          email={request.sender.email}
                      />
                  ))
              : <Loader2 className={'h-8 w-8'}/>}
        </ItemList>
        <ConversationFallback/>;
      </>
  )
      ;
};

export default FriendsPage;