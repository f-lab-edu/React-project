import { Outlet, ScrollRestoration } from 'react-router-dom';
import { LayoutHeader } from '@/widgets/LayoutHeader/ui';
import { LayoutFooter } from '@/widgets/LayoutFooter/ui/LayoutFooter/LayoutFooter';
import { main } from './Layout.css';

export const Layout = () => (
  <>
    <LayoutHeader />
    <div className={main}>
      <Outlet />
    </div>
    <LayoutFooter />
    <ScrollRestoration />
  </>
);
