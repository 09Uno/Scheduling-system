

import * as React from 'react';
import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import styles from "./Home.module.scss"


import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DatePick() {
  const [value, setValue] = React.useState<Moment | null>(moment());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        disablePast={true}
        className={styles.date}
        renderInput={(props) => <TextField {...props} />}
        label="Data e Horário"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
