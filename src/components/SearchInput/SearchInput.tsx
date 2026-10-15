import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';

import useDebounce from '../../hooks/useDebounce';

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
    onSetSearchTerm: Dispatch<SetStateAction<string>>
    options: SearchInputOption[],
    setValue: Dispatch<SetStateAction<SearchInputOption | null>>;
    value: SearchInputOption | null | undefined;
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
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useDebounce(searchTerm);
  useEffect(() => {
    onSetSearchTerm(debouncedSearch);
  }, [debouncedSearch, onSetSearchTerm]);

  return (
    <Autocomplete
      disabled={isLoading}
      fullWidth
      inputValue={searchTerm}
      isOptionEqualToValue={(option, val) => {
        if (!option?.id || !val?.id) return option?.id === val?.id;
        return option.id === val.id;
      }}
      loading={isLoading}
      onChange={(_, newValue) => {
        setValue(newValue);
        if (!newValue) {
          setSearchTerm('');
          onSetSearchTerm('');
        }
      }}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === 'input') {
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
            },
          }}
        />
      )}
      value={value ?? null}
    />
  );
};

export default SearchInput;
