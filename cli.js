"use strict";

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkTextInput = _interopRequireDefault(require("ink-text-input"));

var _inkSelectInput = _interopRequireDefault(require("ink-select-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const items = [{
  label: 'First',
  value: 'first'
}, {
  label: 'Second',
  value: 'second'
}, {
  label: 'Third',
  value: 'third'
}];

const SearchQuery = () => {
  const [query, setQuery] = (0, _react.useState)('');
  const [select, setSelect] = (0, _react.useState)('');
  const filteredItems = items.filter(({
    value
  }) => value.includes(query));
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginRight: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, "Enter your query:")), /*#__PURE__*/_react.default.createElement(_inkTextInput.default, {
    value: query,
    onChange: setQuery
  })), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_inkSelectInput.default, {
    items: filteredItems,
    onSelect: setSelect
  }), /*#__PURE__*/_react.default.createElement(_ink.Text, null, select.label)));
};

(0, _ink.render)( /*#__PURE__*/_react.default.createElement(SearchQuery, null));
