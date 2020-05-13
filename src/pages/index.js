import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AlertsByNight from '../components/AlertsByNight';
import AnomalousAlerts from '../components/AnomalousAlertsTable';
import AnomalousPhotometry from '../components/AnomalousPhotometry';
import Layout from '../components/Layout';
import RecentAlerts from '../components/RecentAlertsPlot';
import RecentPhotometryPlot from '../components/RecentPhotometryPlot';
import RecentPhotometryTable from '../components/RecentPhotometryTable';
import SignIn from '../components/SignIn';
import Targets from '../components/Targets';
import Typography from '@material-ui/core/Typography';

import firebase from '../firebase';
import parseHash from '../navigation';

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

function Nights({ query }) {
  let title = query.date || 'Nights';
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

  if (typeof window !== `undefined`) {
    window.onhashchange = (event) => {
      event.preventDefault();
      const nav = parseHash();
      setPage(nav.page);
      setQuery(nav.query);
    };
  }

  firebase.auth().onAuthStateChanged(user => {
    setAuthorized(firebase.auth().currentUser !== null);
  });

  if (authorized === null) {
    return <></>;
  } else if (authorized) {
    if (page === '#nights') {
      return <Layout><Nights query={query} /></Layout>;
    } else if (page === '#targets') {
      return <Layout><Targets query={query} /></Layout>;
    } else if (page === '#report') {
      return <Layout><Report query={query} /></Layout>;
    } else {
      return <Layout><Dashboard /></Layout>;
    }
  } else {
    return <SignIn />;
  }
}
