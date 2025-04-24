import ItemList from '@/components/shared/item-list/ItemList';
import ConversationFallback
  from '@/components/shared/conversation/ConversationFallback';
import AddFriendForm from '@/app/(root)/friends/_components/AddFriendForm';

type Props = object
const FriendsPage = ({}: Props) => {
  return (
      <>
        <ItemList title={'Friends'} action={<AddFriendForm/>}>
          FriendsPage
        </ItemList>
        <ConversationFallback/>
      </>
  );
};

export default FriendsPage;