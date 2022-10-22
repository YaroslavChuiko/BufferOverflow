import { useTheme } from '@geist-ui/core';
import { X } from '@geist-ui/icons';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';

const CustomMultiSelect = (props) => {
  const { palette } = useTheme();

  const ClearIndicator = (props) => {
    return (
      <components.ClearIndicator {...props}>
        <X size="20px" />
      </components.ClearIndicator>
    );
  };

  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove {...props}>
        <X size="14px" />
      </components.MultiValueRemove>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '6px',
      boxShadow: 'none',
      fontSize: '14px',
      color: palette.foreground,
      borderColor: state.isFocused ? 'black' : palette.accents_2,
      transition: 'border 150ms ease-in 0s,color 200ms ease-out 0s, box-shadow 200ms ease 0s',
      '&:hover': {
        borderColor: palette.foreground,
        cursor: 'text',
      },
      '&:focus': {
        borderColor: palette.foreground,
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      fontSize: '13px',
      borderRadius: '6px',
      border: 'node',
      boxShadow: '0 8px 30px rgb(0 0 0 / 12%)',
      color: palette.accents_5,
      zIndex: '999999',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '8px 12px',
      backgroundColor: state.isSelected ? palette.accents_1 : palette.background,
      color: state.isSelected ? palette.accents_8 : palette.accents_5,
      border: 'node',
      transition: 'all 0.1s linear',
      '&:hover': {
        backgroundColor: palette.accents_1,
        color: palette.accents_8,
        cursor: 'pointer',
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      padding: '2px 0px 2px 7px',
      backgroundColor: palette.accents_2,
      color: palette.accents_6,
      borderRadius: '6px',
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      padding: '0 7px',
      color: palette.accents_3,
      transition: 'all 0.1s linear',

      '&:hover': {
        backgroundColor: 'transparent',
        color: palette.foreground,
        cursor: 'pointer',
      },
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      color: palette.accents_3,
      transition: 'all 0.1s linear',
      '&:hover': {
        cursor: 'pointer',
        color: palette.foreground,
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  };

  return <AsyncSelect components={{ ClearIndicator, MultiValueRemove }} styles={customStyles} {...props} isMulti />;
};

export default CustomMultiSelect;
