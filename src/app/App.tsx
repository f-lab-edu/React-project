import { useState } from 'react';
import { KeyboardEvent } from 'react';

const App = () => {
  const [value, setValue] = useState(false);

  const handleClick = () => {
    setValue((v) => !v);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          setValue((v) => !v);
        }
      }}
    >{`${value}`}</div>
  );
};

export default App;
