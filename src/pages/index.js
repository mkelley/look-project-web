import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AlertsByDay from '../components/AlertsByDay';
import AnomalousAlerts from '../components/AnomalousAlerts';
import AnomalousPhotometry from '../components/AnomalousPhotometry';
import Layout from '../components/Layout';
import RecentAlerts from '../components/RecentAlerts';
import RecentPhotometryPlot from '../components/RecentPhotometryPlot';
import RecentPhotometryTable from '../components/RecentPhotometryTable';
import SignIn from '../components/SignIn';

import firebase from '../firebase';

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

export default function Index() {
  const classes = useStyles();
  const [authorized, setAuthorized] = React.useState(null);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  firebase.auth().onAuthStateChanged(user => {
    setAuthorized(firebase.auth().currentUser !== null);
  });

  return (
    <>
      {authorized &&
        <Layout>
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

            {/* Alerts by day */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AlertsByDay />
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
        </Layout>
      }
      {(authorized === false) && <SignIn />}
    </>
  );
}
