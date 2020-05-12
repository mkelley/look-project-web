import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { alertsByNight, lastWeek, filterInliers } from '../data';
import { LinkToDate } from './LinkTo';

export default function AlertsByNight() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Alerts by Night
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>N</TableCell>
            <TableCell>N(3σ)</TableCell>
            <TableCell>N(5σ)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastWeek.map((date) => {
            const alerts = alertsByNight.get(date);
            return (
              <TableRow key={date}>
                <TableCell><LinkToDate date={date} /></TableCell>
                <TableCell>{alerts.length}</TableCell>
                <TableCell>{filterInliers(alerts, 3, ['ostat', 'estat']).length}</TableCell>
                <TableCell>{filterInliers(alerts, 5, ['ostat', 'estat']).length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
