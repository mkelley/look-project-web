import React from 'react';
import Container from '@material-ui/core/Container';
import SignIn from '../components/SignIn';

import firebase from '../firebase.js';

export default function Index() {
  const [authorized, setAuthorized] = React.useState(null);

  firebase.auth().onAuthStateChanged(user => {
    setAuthorized(firebase.auth().currentUser !== null);
  });

  return (
    <Container component="main" maxWidth="md">
      {authorized &&
        <p>Authorized</p>
      }
      {(authorized === false) &&
        <SignIn />
      }
    </Container>
  );
}
