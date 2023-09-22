import React from 'react';
import Select, { components } from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'linear-gradient(to bottom right, #2482cf, #ffffff)',
    
    // match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "yellow" : "green",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue",
      

    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    
  })
};



const CustomSelect = ({ options, field, form, onChange, placeholder }) => {
  console.log("CustomSelect render:", field.name, field.value);
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
      value={options.find(option => option.value === field.value) || null}
      onChange={(option) => {
        form.setFieldValue(field.name, option ? option.value : '');
        if (onChange) {
          onChange(option);
        }
      }}
      components={{ DropdownIndicator: null }} // This line removes the default dropdown indicator
      placeholder={placeholder}
      styles={customStyles}      
      
    />
  );
};

export default CustomSelect;