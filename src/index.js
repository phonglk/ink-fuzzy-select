import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import { match } from 'fuzzyjs';

const massageOptions = (options) => options.map((option) => (typeof option === 'object' ? option : { label: option, value: option }));
const massageLabel = (label, ranges) => {
  if (!ranges.length) return label;
  let key = 0;
  const out = [];
  const extract = (start, stop, highlight = false) => {
    if (stop - start <= 0) return;
    const txt = label.substring(start, stop);
    out.push(<Text key={key++} color={highlight ? 'green' : undefined}>{txt}</Text>);
  };
  let lastStop = 0;
  ranges.forEach(({ start, stop }) => {
    extract(lastStop, start);
    extract(start, stop, true);
    lastStop = stop;
  });
  extract(lastStop, label.length);
  return out;
};

const FuzzySelect = ({
  prompt, options, onSelect, limit,
}) => {
  const [query, setQuery] = useState('');
  const massagedOptions = massageOptions(options);
  const filteredItems = !query.trim().length ? massagedOptions : massagedOptions.map((option) => {
    const matching = match(query, option.label, { withRanges: true, withScore: true });
    return ({
      ...option,
      label: massageLabel(option.label, matching.ranges),
      ...matching,
    });
  })
    .filter((opt) => opt.ranges.length > 0)
    .sort((opt1, opt2) => opt2.score - opt1.score);

  return (
    <Box flexDirection="column">
      <Box>
        <Box marginRight={1}>
          <Text>{prompt}</Text>
        </Box>
        <TextInput value={query} onChange={setQuery} />
      </Box>
      <Box flexDirection="column">
        <SelectInput
          items={filteredItems}
          onSelect={({ value }) => onSelect(value)}
          limit={limit}
        />
      </Box>
    </Box>
  );
};

FuzzySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])).isRequired,
  prompt: PropTypes.string,
  limit: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

FuzzySelect.defaultProps = {
  prompt: 'Search>',
  limit: SelectInput.defaultProps.limit,
};

export default FuzzySelect;
