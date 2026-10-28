import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';

import { getStorageImageUrl } from '../../helpers/utils';
import useDebounce from '../../hooks/useDebounce';
import { StyledAvatar } from '../../global_styled_components';

export interface SearchInputOption {
  id: string;
  imageId?: string; 
  label: string;
}
interface SearchInputProps {
  defaultValue?: SearchInputOption | null;
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
  defaultValue = null,
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
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedOption = useMemo(() => {
    if (!value) return null;

    return (
      options?.find((option) => option?.id === value) ||
      (defaultValue?.id === value ? defaultValue : null)
    );
  }, [defaultValue, options, value]);

  const debouncedSearch = useDebounce(searchTerm);
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.trim().length >= 3 && debouncedSearch !== selectedOption?.label) {
      onSetSearchTerm(debouncedSearch);
    } else if (debouncedSearch.trim().length === 0) {
      onSetSearchTerm('');
    }
  }, [debouncedSearch, onSetSearchTerm, selectedOption?.label]);


  return (
    <Autocomplete
      fullWidth
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      loading={isLoading}
      onChange={(_, newValue) => {
        setValue(newValue ? newValue?.id : '');
        if (!newValue) {
          setSearchTerm('');
          onSetSearchTerm('');
        }
      }}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === 'input' || reason === 'clear') {
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
