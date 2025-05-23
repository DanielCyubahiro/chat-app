import {Id} from '@/convex/_generated/dataModel';
import Link from 'next/link';
import {Card} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';

type Props = {
  id: Id<'conversations'>,
  name: string,
  lastMessageSender?: string,
  lastMessageContent?: string
  unseenCount: number
}

const GroupConversationItem = ({
  id,
  name,
  lastMessageSender,
  lastMessageContent,
  unseenCount,
}: Props) => {
  return (
      <Link className={'w-full'} href={`/conversations/${id}`}>
        <Card className={'p-2 flex flex-row items-center justify-between'}>
          <div className="flex flex-row items-center gap-4 truncate">
            <Avatar>
              <AvatarFallback>
                {name.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <h4 className="truncate">
                {name}
              </h4>
              {lastMessageSender && lastMessageContent
                  ? (
                      <span
                          className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                        <p className={'font-semibold'}>
                          {lastMessageSender}{':'}&nbsp;
                        </p>
                        <p className="truncate overflow-ellipsis">
                          {lastMessageContent}
                        </p>
                      </span>
                  )
                  : <p className="text-sm text-muted-foreground truncate">
                    Start a new conversation
                  </p>}
            </div>
          </div>
          {unseenCount ? <Badge>{unseenCount}</Badge> : null}
        </Card>
      </Link>
  );
};

export default GroupConversationItem;