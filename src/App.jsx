import React, { useState } from 'react';
import styled from '@emotion/styled';

const Box = styled.div`
  height: 100px;
  background: #fff;
  transition: all 300ms;
  color: #555;
  box-shadow:
    lightcoral 0px 50px 100px -20px,
    lightcoral 0px 30px 60px -30px;
`;
const App = () => {
  const [value, setValue] = useState(false);

  const handleClick = (value) => setValue((v) => !v);

  return <Box onClick={handleClick}>{`${value}`}</Box>;
};

export default App;
