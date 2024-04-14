import { Link } from 'react-router-dom';
import {
  footer,
  footerContainer,
} from '@/widgets/LayoutFooter/ui/LayoutFooter/LayoutFooter.css';

export const LayoutFooter = () => (
  <footer className={footer}>
    <section className={footerContainer}>
      <Link to="/">Logo</Link>
      <div>React-project</div>
    </section>
  </footer>
);
