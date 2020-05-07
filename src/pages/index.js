import React from 'react';
import Layout from '../components/Layout';
import SignIn from '../components/SignIn';
import firebase from '../firebase';

export default function Index() {
  const [authorized, setAuthorized] = React.useState(null);

  firebase.auth().onAuthStateChanged(user => {
    setAuthorized(firebase.auth().currentUser !== null);
  });

  return (
    <>
      {authorized &&
        <Layout />
      }
      {(authorized === false) && <SignIn />}
    </>
  );
}
