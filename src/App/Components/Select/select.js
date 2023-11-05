import React from 'react';

const Select = ({title, data, handleSelectChange, multiple, placeholder}) => {

  const options = data && data.map((item, i) => {
    return (
      <option key={i} value={item?.value}>
        {item?.label}
      </option>
    );
  });

  return (
    <label>
      {title}
      {/* {JSON.stringify(data)} */}
      <select name={title} onChange={handleSelectChange} >
        {placeholder &&
        <option value="" disabled selected>{placeholder}</option>}
        {options}
      </select>
    </label>
  );
};

export default Select;