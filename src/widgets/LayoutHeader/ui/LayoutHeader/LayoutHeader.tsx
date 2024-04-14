import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/shared/consts/theme/reset.css';
import { container, nav, navItem, navLeft, navRight } from './LayoutHeader.css';
import throttle from 'lodash/throttle';
import { navMenu } from '@/shared/consts/navigation';

export const LayoutHeader = () => {
  const [showLayoutHeader, setShowLayoutHeader] = useState(true);
  const offsetRef = useRef(typeof window === 'undefined' ? 0 : window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isTop = currentScrollY === 0;

      const isBottom =
        document.body.clientHeight === currentScrollY + window.innerHeight;

      if (isTop) {
        setShowLayoutHeader(true);
      } else if (!isBottom) {
        if (currentScrollY < offsetRef.current) {
          setShowLayoutHeader(true);
        } else {
          setShowLayoutHeader(false);
        }
      }
      offsetRef.current = currentScrollY;
    };

    const throttleHandleScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttleHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttleHandleScroll);
    };
  }, []);

  return (
    <header className={container}>
      {showLayoutHeader && (
        <nav className={nav} style={{ height: '55px' }}>
          <div className={navLeft}>
            <div>Logo</div>
          </div>
          <ul className={navRight}>
            {navMenu.map((menu) => (
              <Link to={menu.link} key={menu.title}>
                <li className={navItem}>{menu.title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
