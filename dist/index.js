"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkTextInput = _interopRequireDefault(require("ink-text-input"));

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

var _fuzzyjs = require("fuzzyjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const massageOptions = options => options.map(option => typeof option === 'object' ? option : {
  label: option,
  value: option
});

const massageLabel = (label, ranges) => {
  if (!ranges.length) return label;
  let key = 0;
  const out = [];

  const extract = (start, stop, highlight = false) => {
    if (stop - start <= 0) return;
    const txt = label.substring(start, stop);
    out.push( /*#__PURE__*/_react.default.createElement(_ink.Text, {
      key: key++,
      color: highlight ? 'green' : undefined
    }, txt));
  };

  let lastStop = 0;
  ranges.forEach(({
    start,
    stop
  }) => {
    extract(lastStop, start);
    extract(start, stop, true);
    lastStop = stop;
  });
  extract(lastStop, label.length);
  return out;
};

const FuzzySelect = ({
  prompt,
  options,
  onSelect,
  limit
}) => {
  const [query, setQuery] = (0, _react.useState)('');
  const massagedOptions = massageOptions(options);
  const filteredItems = !query.trim().length ? massagedOptions : massagedOptions.map(option => {
    const matching = (0, _fuzzyjs.match)(query, option.label, {
      withRanges: true,
      withScore: true
    });
    return { ...option,
      label: massageLabel(option.label, matching.ranges),
      ...matching
    };
  }).filter(opt => opt.ranges.length > 0).sort((opt1, opt2) => opt2.score - opt1.score);
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginRight: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, prompt)), /*#__PURE__*/_react.default.createElement(_inkTextInput.default, {
    value: query,
    onChange: setQuery
  })), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_inkSelectInput.default, {
    items: filteredItems,
    onSelect: ({
      value
    }) => onSelect(value),
    limit: limit
  })));
};

FuzzySelect.propTypes = {
  options: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
    label: _propTypes.default.string,
    value: _propTypes.default.string
  })])).isRequired,
  prompt: _propTypes.default.string,
  limit: _propTypes.default.number,
  onSelect: _propTypes.default.func.isRequired
};
FuzzySelect.defaultProps = {
  prompt: 'Search>',
  limit: 10
};
var _default = FuzzySelect;
exports.default = _default;
