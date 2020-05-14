import React from 'react';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker } from "@material-ui/pickers";
import MUIDataTable from "mui-datatables";

import { LinkToTarget } from './LinkTo';
import { alertsByNight, phot, nights } from '../data';
import { setWindowHREF } from '../navigation';

function toFixed(N) {
  return ((value, tableMeta, updateValue) =>
    value === undefined ? '' : Number(value).toFixed(N)
  );
}

function formatDesignation(value, tableMeta, updateValue) {
  return value === undefined ? '' : <LinkToTarget designation={value}/>;
}

function formatDate(value) {
  return value.format('YYYY-MM-DD HH:MM');
}

const columns = [
  { name: "designation", label: "Designation", options: { customBodyRender: formatDesignation } },
  { name: "source", label: 'Source' },
  { name: "date", label: <>Date<br />(UTC)</>, options: { customBodyRender: formatDate, display: 'false' } },
  { name: "rh", label: <>r<sub>h</sub><br />(au)</>, options: { customBodyRender: toFixed(3) } },
  { name: "delta", label: <>Δ<br />(au)</>, options: { customBodyRender: toFixed(3) } },
  { name: "phase", label: <>phase<br />(°)</>, options: { customBodyRender: toFixed(2) } },
  { name: "filter", label: "Filter" },
  { name: "m7", label: <>m(7")<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
  { name: "merr7", label: <>σ(7")<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
  { name: "estat", label: "estat", options: { customBodyRender: toFixed(1) } },
  { name: "ostat", label: "ostat", options: { customBodyRender: toFixed(1) } },
];

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  error: {
    marginTop: theme.spacing(1),
    color: "red"
  }
}));

export default function Nights({ query }) {
  const classes = useStyles();

  function handleDateChange(newDate) {
    query.date = newDate.format('YYYY-MM-DD');
    setWindowHREF('#nights', query);
  }

  const requestedDate = query.date || nights[nights.length - 1];
  const validNight = nights.includes(requestedDate) ? true : null;
  const error = validNight ? null : true;

  const data = Array.prototype.concat(alertsByNight.get(requestedDate),
    phot.filter(row => row.date.format('YYYY-MM-DD') === requestedDate)
  );

  return (
    <>
      <Typography component="p" variant="h4">Nights</Typography>
      <Box className={classes.box}>
        { error &&
          <Typography component="p" className={classes.error}>
            Date not found
          </Typography>
        }
        <KeyboardDatePicker
          value={requestedDate}
          onChange={date => handleDateChange(date)}
          format="YYYY-MM-DD"
        />
      </Box>
      <Container>
        {validNight && <MUIDataTable data={data} columns={columns} />}
      </Container>
    </>
  );
}
