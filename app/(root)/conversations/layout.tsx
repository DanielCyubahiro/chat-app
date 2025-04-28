'use client';

import {PropsWithChildren} from 'react';
import ItemList from '@/components/shared/item-list/ItemList';
import {api} from '@/convex/_generated/api';
import {useQuery} from 'convex/react';
import {Loader2} from 'lucide-react';
import DMConversationItem
  from '@/app/(root)/conversations/_components/DMConversationItem';
import CreateGroupDialog
  from '@/app/(root)/conversations/_components/CreateGroupDialog';

type Props = PropsWithChildren<object>

const ConversationsLayout = ({children}: Props) => {
  const conversations = useQuery(api.conversations.get);
  return (
      <>
        <ItemList title={'Conversations'} action={<CreateGroupDialog/>}>
          {conversations
              ? (conversations.length === 0
                      ? (
                          <p className={'w-full h-full flex justify-center items-center'}>
                            No conversations found
                          </p>
                      )
                      : conversations.map(
                          (conversation) => conversation.conversation.isGroup
                              ? null
                              : <DMConversationItem
                                  key={conversation.conversation._id}
                                  id={conversation.conversation._id}
                                  username={conversation?.otherMember?.username ||
                                      ''}
                                  imageUrl={conversation?.otherMember?.imageUrl ||
                                      ''}
                                  lastMessageSender={conversation?.lastMessage?.sender}
                                  lastMessageContent={conversation?.lastMessage?.content}
                              />,
                      )
              )
              : <Loader2/>
          }
        </ItemList>
        {children}
      </>
  );
};

export default ConversationsLayout;