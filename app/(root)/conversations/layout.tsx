import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<object>

const ConversationsLayout = ({children}: Props) => {
  return <>{children}</>;
};

export default ConversationsLayout;