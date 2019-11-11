import React from 'react';

const Option = ({value, name}) => (
  <option value={value || name}>
    {name}
  </option>
);

export default Option;
