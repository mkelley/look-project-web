import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { LinkToNight, LinkToTarget } from './LinkTo';
import { recentPhot } from '../data';

function toFixed(N) {
  return ((value, tableMeta, updateValue) =>
    value === undefined ? '' : Number(value).toFixed(N)
  );
}

function formatDate(value, tableMeta, updateValue) {
  return (value === undefined ? '' : <LinkToNight date={value} format='YYYY-MM-DD HH:MM' />);
}

function formatDesignation(value, tableMeta, updateValue) {
  return value === undefined ? '' : <LinkToTarget designation={value}/>;
}

const columns = [
  { name: "designation", label: 'Designation', options: {customBodyRender: formatDesignation} },
  { name: "source", label: 'Source' },
  { name: "date", label: <>Date<br/>(UTC)</>, options: {customBodyRender: formatDate}},
  { name: "rh", label: <>r<sub>h</sub><br/>(au)</>, options: {customBodyRender: toFixed(3)} },
  { name: "delta", label: <>Δ<br/>(au)</>, options: {customBodyRender: toFixed(3)} },
  { name: "phase", label: <>phase<br/>(°)</>, options: {customBodyRender: toFixed(2)} },
  { name: "filter", label: "Filter" },
  { name: "m7", label: <>m(7")<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
  { name: "merr7", label: <>σ(7")<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
  { name: "estat", label: "estat", options: {customBodyRender: toFixed(1)} },
  { name: "ostat", label: "ostat", options: {customBodyRender: toFixed(1)} },
];

export default function RecentPhotometryTable() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Photometry
      </Typography>
      <MUIDataTable data={recentPhot} columns={columns} />
    </React.Fragment>
  );
}