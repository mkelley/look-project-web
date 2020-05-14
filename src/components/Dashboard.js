import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import AlertsByNight from '../components/AlertsByNight';
import AnomalousAlerts from '../components/AnomalousAlertsTable';
import AnomalousPhotometry from '../components/AnomalousPhotometry';
import RecentAlerts from '../components/RecentAlertsPlot';
import RecentPhotometryPlot from '../components/RecentPhotometryPlot';
import RecentPhotometryTable from '../components/RecentPhotometryTable';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid container spacing={3}>
        {/* Recent alerts */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <RecentAlerts />
          </Paper>
        </Grid>
        {/* Anomalous alerts */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <AnomalousAlerts />
          </Paper>
        </Grid>

        {/* Alerts by night */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AlertsByNight />
          </Paper>
        </Grid>

        {/* Recent stats */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <RecentPhotometryPlot />
          </Paper>
        </Grid>
        {/* Anomalous photometry */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <AnomalousPhotometry />
          </Paper>
        </Grid>

        {/* Recent photometry */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentPhotometryTable />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}