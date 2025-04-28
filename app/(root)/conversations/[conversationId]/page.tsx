'use client';

import React, {useState} from 'react';
import ConversationContainer
  from '@/components/shared/conversation/ConversationContainer';
import {Id} from '@/convex/_generated/dataModel';
import {useQuery} from 'convex/react';
import {api} from '@/convex/_generated/api';
import {Loader2} from 'lucide-react';
import Header
  from '@/app/(root)/conversations/[conversationId]/_components/Header';
import Body
  from '@/app/(root)/conversations/[conversationId]/_components/body/Body';
import ChatInput
  from '@/app/(root)/conversations/[conversationId]/_components/input/ChatInput';
import {useParams} from 'next/navigation';
import RemoveFriendDialog
  from '@/app/(root)/conversations/[conversationId]/_components/dialog/RemoveFriendDialog';

const ConversationPage = () => {
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const {conversationId} = useParams<{ conversationId: string }>();
  const convexConversationId = conversationId as Id<'conversations'>;
  const conversation = useQuery(
      api.conversation.get,
      {
        id: convexConversationId,
      });
  return (
      conversation === undefined
          ? (
              <div className={'w-full h-full flex justify-center items-center'}>
                <Loader2 className={'h-8 w-8'}/>
              </div>
          )
          : conversation === null
              ? (
                  <p className="w-8 h-8 flex justify-center items-center">
                    No conversations found
                  </p>
              )
              : (
                  <ConversationContainer>
                    <RemoveFriendDialog
                        conversationId={convexConversationId}
                        open={removeFriendDialogOpen}
                        setOpen={setRemoveFriendDialogOpen}/>
                    <Header
                        name={(conversation.isGroup
                            ? conversation.name
                            : conversation.otherMember.username) || ''}
                        imageUrl={conversation.isGroup
                            ? undefined
                            : conversation.otherMember.imageUrl}
                        options={conversation.isGroup
                            ? [
                              {
                                label: 'Leave group',
                                destructive: false,
                                onClick: () => setLeaveGroupDialogOpen(true),
                              },
                              {
                                label: 'Delete group',
                                destructive: true,
                                onClick: () => setDeleteGroupDialogOpen(true),
                              }]
                            : [
                              {
                                label: 'Remove friend',
                                destructive: true,
                                onClick: () => setRemoveFriendDialogOpen(true),
                              }]
                        }
                    />
                    <Body/>
                    <ChatInput/>
                  </ConversationContainer>
              )
  );
};

export default ConversationPage;