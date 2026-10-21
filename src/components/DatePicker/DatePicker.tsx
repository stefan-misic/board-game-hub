import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const dateFormatByTypes = {
  day: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY'
};

interface DatePickerProps {
  error: boolean;
  helperText: string | undefined;
  isRequired?: boolean;
  label: string;
  onChange: (value: string) => void;
  type: 'day' | 'month' | 'year',
  value: string;
}
const DatePicker = ({
  error,
  helperText,
  isRequired = false,
  label,
  onChange,
  type = 'day',
  value
}: DatePickerProps) => {
  const dateFormat = dateFormatByTypes[type];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        minDate={dayjs('1900-01-01')}
        onChange={(newValue) => onChange(newValue && dayjs(newValue).isValid() ? dayjs(newValue).format(dateFormat) : '')}
        openTo={type}
        slotProps={{
          textField: {
            error: !!error,
            helperText: helperText,
            readOnly: true,
            required: isRequired
          },
        }}
        value={value ? dayjs(value, dateFormat, true) : null}
        views={type === 'day' ? ['year', 'month', 'day'] : type === 'month' ? ['year', 'month'] : ['year']}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
