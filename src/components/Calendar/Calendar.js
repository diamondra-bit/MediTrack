import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs'; // Importez dayjs pour configurer la locale française
import 'dayjs/locale/fr'; // Importez la locale française pour dayjs
import './Calendar.css'

// Configurez la locale française pour dayjs
dayjs.locale('fr');

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h3 className='calendar-title'>Calendrier</h3>
      <DateCalendar />
    </LocalizationProvider>
  );
}
