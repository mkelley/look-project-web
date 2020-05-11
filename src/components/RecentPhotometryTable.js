import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { LinkToDate, LinkToObject } from './LinkTo';
import { recentPhot } from '../data';

function toFixed(N) {
  return ((value, tableMeta, updateValue) =>
    value === undefined ? '' : Number(value).toFixed(N)
  );
}

function formatDate(value, tableMeta, updateValue) {
  return (value === undefined ? '' : <LinkToDate date={value} format='YYYY-MM-DD HH:MM' />);
}

function formatObject(value, tableMeta, updateValue) {
  return value === undefined ? '' : <LinkToObject object={value}/>;
}

const columns = [
  { name: "object", label: 'Object', options: {customBodyRender: formatObject} },
  { name: "date", label: <>Date<br/>(UTC)</>, options: {customBodyRender: formatDate}},
  { name: "rh", label: <>r<sub>h</sub><br/>(au)</>, options: {customBodyRender: toFixed(3)} },
  { name: "delta", label: <>Δ<br/>(au)</>, options: {customBodyRender: toFixed(3)} },
  { name: "phase", label: <>phase<br/>(°)</>, options: {customBodyRender: toFixed(2)} },
  { name: "filter", label: "Filter" },
  { name: "m5", label: <>m(5")<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
  { name: "merr5", label: <>σ<br/>(mag)</>, options: {customBodyRender: toFixed(2)} },
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