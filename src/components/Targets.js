import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";

import { LinkToNight } from './LinkTo';
import Plot from './Plot';
import { alertsByNight, phot, targets } from '../data';

function toFixed(N) {
  return ((value, tableMeta, updateValue) =>
    value === undefined ? '' : Number(value).toFixed(N)
  );
}

function formatDate(value, tableMeta, updateValue) {
  return (value === undefined ? '' : <LinkToNight date={value} format='YYYY-MM-DD HH:MM' />);
}

function mdiff(value, tableMeta, updateValue) {
  return (value === undefined ? '' : (value - tableMeta.rowData[6]).toFixed(2));
}

const columns = [
  { name: "designation", label: "Designation", options: { display: 'false' } },
  { name: "source", label: 'Source' },
  { name: "date", label: <>Date<br />(UTC)</>, options: { customBodyRender: formatDate } },
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

export default function Targets({ query }) {
  const classes = useStyles();

  //let designation = (targets.indexOf(query.designation) > -1) ? query.designation : null;
  const validTarget = targets.indexOf(query.designation) > -1 ? true : null;
  const error = (query.designation !== undefined) && (!validTarget) ? true : null;

  const alerts = Array.prototype.concat(phot, ...alertsByNight.values()).filter(
    row => row.designation == query.designation
  );

  return (
    <>
      <Typography component="p" variant="h4">Targets</Typography>
      <Box className={classes.box}>
        <Autocomplete
          id="select-target"
          size="small"
          options={targets}
          getOptionLabel={(option) => String(option)}
          value={query.designation}
          style={{width: 200}}
          renderInput={(params) => <TextField {...params} label="Designation" variant="outlined" />}
          onChange={(event, newValue) => window.location.href = '#targets?designation=' + newValue }
        />
        { error &&
          <Typography component="p" className={classes.error}>
            Target not found
          </Typography>
        }
      </Box>
      <Container>
        {validTarget &&
          <Plot
            data={[{
              x: alerts.map(row => row.rh),
              y: alerts.map(row => row.m7),
              error_y: {
                type: 'data',
                array: alerts.map(row => row.merr7),
                visible: true
              },
              mode: 'markers',
              type: 'scatter',
              marker: {
                color: '#edc948'
              },
            }]}
            layout={{
              xaxis: {
                title: 'rh (au)'
              },
              yaxis: {
                title: 'm(7") (mag)'
              },
              autosize: true,
              automargin: true,
              margin: { t: 20 },
              height: 325,
            }}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        }
        {validTarget && <MUIDataTable data={alerts} columns={columns} />}
      </Container>
    </>
  );
}
