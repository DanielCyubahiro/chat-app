import {PropsWithChildren} from 'react';
import SidebarWrapper from '@/components/shared/sidebar/SidebarWrapper';

type Props = PropsWithChildren<object>;

const Layout = ({children}: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default Layout;