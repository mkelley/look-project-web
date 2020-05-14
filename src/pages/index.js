import React from 'react';

import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import Nights from '../components/Nights';
import SignIn from '../components/SignIn';
import Targets from '../components/Targets';
import Typography from '@material-ui/core/Typography';

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

import firebase from '../firebase';
import { parseHash } from '../navigation';

function Report({ query }) {
  // allow reporting for monthly, semester, project (default)
  const periods = ['monthly', 'semester', 'project']
  const period = periods[periods.indexOf(query.period)] || 'project';
  const title = period[0].toUpperCase() + period.substr(1) + ' Report';

  return (
    <>
      <Typography component="p" variant="h4">
        {title}
      </Typography>
      <Typography component="p">
        TBD
      </Typography>
    </>
  );
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

  let content;
  if (authorized === null) {
    content = <div></div>;
  } else if (authorized) {
    if (page === '#nights') {
      content = <Layout><Nights query={query} /></Layout>;
    } else if (page === '#targets') {
      content = <Layout><Targets query={query} /></Layout>;
    } else if (page === '#report') {
      content = <Layout><Report query={query} /></Layout>;
    } else {
      content = <Layout><Dashboard /></Layout>;
    }
  } else {
    content = <SignIn />;
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {content}
    </MuiPickersUtilsProvider>
  );
}
