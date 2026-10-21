import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { getStorageImageUrl } from '../../helpers/utils';
import useDebounce from '../../hooks/useDebounce';
import { StyledAvatar } from '../../global_styled_components';

export interface SearchInputOption {
  id: string;
  imageId?: string; 
  label: string;
}
interface SearchInputProps {
  error: boolean;
  helperText: string | undefined;
  isLoading: boolean;
  isRequired?: boolean;
  label: string;
  onSetSearchTerm: (term: string) => void;
  options: SearchInputOption[],
  setValue: (id: string) => void;
  value: string;
}
const SearchInput = ({
  error,
  helperText,
  isLoading,
  isRequired = false,
  label,
  onSetSearchTerm,
  options,
  setValue,
  value
}: SearchInputProps) => {
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const [previousValue, setPreviousValue] = useState<string>(value);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<SearchInputOption | null>(null);

  if (value !== previousValue) {
    setPreviousValue(value);
    setIsUserTyping(false);

    if (!value) {
      setSelectedOption(null);
      setSearchTerm('');
    } else {
      const isOptionSelected = options?.find((option) => option?.id === value);
      if (isOptionSelected) {
        setSelectedOption(isOptionSelected);
        setSearchTerm(isOptionSelected?.label);
      }
    }
  }

  const debouncedSearch = useDebounce(searchTerm);
  useEffect(() => {
    if (isUserTyping) {
      onSetSearchTerm(debouncedSearch);
    }
  }, [debouncedSearch, isUserTyping, onSetSearchTerm]);


  return (
    <Autocomplete
      fullWidth
      inputValue={searchTerm}
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      loading={isLoading}
      onChange={(_, newValue) => {
        setIsUserTyping(false);
        setSelectedOption(newValue);
        setValue(newValue ? newValue?.id : '');
        
        if (!newValue) {
          setSearchTerm('');
          onSetSearchTerm('');
        }
      }}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === 'input' || reason === 'clear') {
          setIsUserTyping(true);
          setSearchTerm(newInputValue);
        } else if (reason === 'reset') {
          setSearchTerm(newInputValue);
        }
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          required={isRequired}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                  {params.InputProps.endAdornment}
                </InputAdornment>
              ),
              startAdornment: selectedOption?.imageId ? (
                <InputAdornment position='start'>
                  <StyledAvatar
                    $size='list'
                    alt={selectedOption?.label}
                    src={typeof selectedOption?.imageId === 'string' ? getStorageImageUrl(selectedOption?.imageId) : ''}
                  />
                </InputAdornment>
              ) : null,
            },
          }}
        />
      )}
      renderOption={(params, option) => {
        const { key, ...optionProps } = params;

        return (
          <Stack
            alignItems='center'
            component='li'
            direction='row'
            key={key}
            {...optionProps}
            spacing={1}
          >
            {option?.imageId ? (
              <StyledAvatar
                $size='list'
                alt={option?.label}
                src={typeof option?.imageId === 'string' ? getStorageImageUrl(option?.imageId) : ''}
              />)
              : null}
            <Typography>{option?.label}</Typography>
          </Stack>
        );
      }}
      value={selectedOption}
    />
  );
};

export default SearchInput;
