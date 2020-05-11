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
import parseHash from '../navigation';
import { Typography } from '@material-ui/core';

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

function Dashboard() {
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
    </>
  );
}

function SummaryByDate({ query }) {
  let title = query.date || 'Summary by Date';
  return (
    <Typography component="p" variant="h4">
      {title}
    </Typography>
  )
}

function SummaryByObject({ query }) {
  let title = query.object || 'Summary by Object';
  return (
    <Typography component="p" variant="h4">
      {title}
    </Typography>
  )
}

function Report({ query }) {
  // allow reporting for monthly, semester, project (default)
  const periods = ['monthly', 'semester', 'project']
  const period = periods[periods.indexOf(query.period)] || 'project';
  const title = period[0].toUpperCase() + period.substr(1) + ' Report';
  console.log(query, query.period, periods, periods.indexOf(query.period));
  return (
    <Typography component="p" variant="h4">
      {title}
    </Typography>
  )
}

export default function Index() {
  const [authorized, setAuthorized] = React.useState(null);
  const nav = parseHash();
  const [page, setPage] = React.useState(nav.page);
  const [query, setQuery] = React.useState(nav.query);

  window.onhashchange = (event) => {
    event.preventDefault();
    const nav = parseHash();
    setPage(nav.page);
    setQuery(nav.query);
  };

  firebase.auth().onAuthStateChanged(user => {
    setAuthorized(firebase.auth().currentUser !== null);
  });

  if (authorized === null) {
    return <></>;
  } else if (authorized) {
    if (page === '#summary-by-date') {
      return <Layout><SummaryByDate query={query} /></Layout>;
    } else if (page === '#summary-by-object') {
      return <Layout><SummaryByObject query={query} /></Layout>;
    } else if (page === '#report') {
      return <Layout><Report query={query} /></Layout>;
    } else {
      return <Layout><Dashboard /></Layout>;
    }
  } else {
    return <SignIn />;
  }
}
