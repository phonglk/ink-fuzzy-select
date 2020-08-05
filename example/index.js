import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import FuzzySelect from '../dist';

const items = [
  {
    label: 'First',
    value: 'first',
  },
  {
    label: 'Second',
    value: 'second',
  },
  {
    label: 'Third',
    value: 'third',
  },
];

const SearchQuery = () => {
  const [select, setSelect] = useState('');

  return (
    <Box flexDirection="column">
      <FuzzySelect options={items} onSelect={setSelect} />
      <Text>{select}</Text>
    </Box>
  );
};

render(<SearchQuery />);
