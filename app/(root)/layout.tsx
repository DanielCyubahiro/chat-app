import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<object>;

const Layout = ({children}: Props) => {
  return <>{children}</>;
};

export default Layout;