import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export default function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pick a date"
        value={selectedDate}
        onChange={(newDate) => {
          setSelectedDate(newDate);
          console.log(newDate?.format('YYYY-MM-DD')); // check console
        }}
      />
    </LocalizationProvider>
  );
}