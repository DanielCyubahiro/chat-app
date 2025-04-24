import ItemList from '@/components/shared/item-list/ItemList';
import ConversationFallback
  from '@/components/shared/conversation/ConversationFallback';

type Props = object
const FriendsPage = ({}: Props) => {
  return (
      <>
        <ItemList title={'Friends'}>
          FriendsPage
        </ItemList>
        <ConversationFallback/>
      </>
  );
};

export default FriendsPage;