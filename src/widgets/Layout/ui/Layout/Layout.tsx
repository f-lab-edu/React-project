import { Outlet, ScrollRestoration } from 'react-router-dom';
import { LayoutHeader } from '@/widgets/LayoutHeader/ui';
import { LayoutFooter } from '@/widgets/LayoutFooter/ui/LayoutFooter/LayoutFooter';

export const Layout = () => (
  <div>
    <LayoutHeader />
    <Outlet />
    <LayoutFooter />
    <ScrollRestoration />
  </div>
);
