import {PropsWithChildren} from 'react';
import ItemList from '@/components/shared/item-list/ItemList';

type Props = PropsWithChildren<object>

const ConversationsLayout = ({children}: Props) => {
  return (
      <>
        <ItemList title={'Conversations'}>
          Conversations
        </ItemList>
        {children}
      </>
  );
};

export default ConversationsLayout;