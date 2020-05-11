import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { recentPhot, filterInliers } from '../data';
import { LinkToObject } from './LinkTo';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AnomalousPhotometry() {
  const classes = useStyles();
  const outliers = filterInliers(recentPhot, 3, ['ostat']);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Anomalous Photometry
      </Typography>
      {(outliers.length > 0) &&
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Object</TableCell>
                <TableCell align="right">estat</TableCell>
                <TableCell align="right">ostat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outliers.map((row) => (
                <TableRow key={row.object}>
                  <TableCell component="th" scope="row">
                    <LinkToObject object={row.object} />
                  </TableCell>
                  <TableCell align="right">{row.estat.toFixed(1)}</TableCell>
                  <TableCell align="right">{row.ostat.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      {(outliers.length === 0) &&
        <Typography component="p" variant="h5">
          None
        </Typography>
      }
    </React.Fragment>
  );
}
