import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { recentPhot } from '../data';

const columns = [
  'Object',
  { name: "date", label: <>Date<br/>(UTC)</> },
  { name: "rh", label: <>r<sub>h</sub><br/>(au)</> },
  { name: "delta", label: <>Δ<br/>(au)</> },
  { name: "Phase", label: <>phase<br/>(°)</> },
  "Filter",
  { name: "m", label: <>m(5")<br/>(mag)</> },
  { name: "merr", label: <>σ<br/>(mag)</> },
  "estat",
  "ostat"
];

export default function RecentPhotometryTable() {
  const data = recentPhot.map((row) => [
    row.object,
    row.date.format('YYYY-MM-DD HH:MM'),
    row.rh.toFixed(3),
    row.delta.toFixed(3),
    row.phase.toFixed(2),
    row.filter,
    row.m[1].toFixed(2),
    row.merr[1].toFixed(2),
    row.estat.toFixed(1),
    row.ostat.toFixed(1)
  ]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Photometry
      </Typography>
      <MUIDataTable data={data} columns={columns} />
    </React.Fragment>
  );
}