import React from 'react';
import Select, { components } from 'react-select';

const CustomSelect = ({ options, field, form, onChange }) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {/* You can put your own custom icon or text here if you want */}
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      id="long-value-select"
      instanceId="long-value-select"
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => {
        if (form && field) {
          form.setFieldValue(field.name, option ? option.value : '');
          if (onChange) {
            onChange(option);
          }
        }
      }}
      components={{ DropdownIndicator: null }} // This line removes the default dropdown indicator
    />
  );
};

export default CustomSelect;