import { useState } from 'react';
import { itemWrapper, sampleMain } from './Page.css';

const arrays = () => Array.from({ length: 100 }, (_, i) => i);

export const MainPage = () => {
  const [items, setItems] = useState(arrays);

  return (
    <div>
      <div className={itemWrapper}>
        {items.map((item) => (
          <button
            key={item}
            className={sampleMain}
            onClick={() => setItems(items)}
          >
            시작{item}
          </button>
        ))}
      </div>
    </div>
  );
};
