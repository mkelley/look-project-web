import React from 'react';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import { recentPhot } from '../data';

const headCells = [
  { id: 'object', numeric: false, disablePadding: true, label: 'Object' },
  { id: 'rh', numeric: true, disablePadding: false, label: <>rh<br />(au)</> },
  { id: 'delta', numeric: true, disablePadding: false, label: <>Δ<br />(au)</> },
  { id: 'phase', numeric: true, disablePadding: false, label: <>phase<br />(au)</> },
  { id: 'filt', numeric: true, disablePadding: false, label: 'filt' },
  { id: 'm', numeric: true, disablePadding: false, label: <>m<br />(mag)</> },
  { id: 'merr', numeric: true, disablePadding: false, label: <>σ<br />(mag)</> },
  { id: 'estat', numeric: true, disablePadding: false, label: 'estat' },
  { id: 'ostat', numeric: true, disablePadding: false, label: 'ostat' },
];

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
/*
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Photometry
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headCells.map(headCell =>
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              <TableCell
            )}
          </TableRow>
        </TableHead>
          <TableBody>
            {recentPhot.map((row) => (
              <TableRow key={row.object + row.date}>
                <TableCell>{row.object}
                  <TableCell>{row.date.format('YYYY-MM-DD HH:MM')}
                    <TableCell>{row.rh.toFixed(3)}
                      <TableCell>{row.delta.toFixed(3)}
                        <TableCell>{row.phase.toFixed(2)}
                          <TableCell>{row.filt}
                            <TableCell>{row.m[1].toFixed(2)}
                              <TableCell>{row.merr[1].toFixed(2)}
                                <TableCell>{row.estat.toFixed(1)}
                                  <TableCell>{row.ostat.toFixed(1)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
*/