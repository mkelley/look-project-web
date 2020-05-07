// Based on https://github.com/firebase/functions-samples/blob/master/fcm-notifications/public/main.js
import firebase from './firebase';

const messaging = firebase.messaging();

function setTokenSentToServer(sent) {
  window.localStorage.setItem('messagingTokenSentToServer', sent ? '1' : '0');
}

function isTokenSentToServer() {
  return window.localStorage.getItem('messagingTokenSentToServer') === '1';
}

export function ifNotificationsAreEnabled(f) {
  messaging.getToken()
    .then((currentToken) => {
      if (currentToken)
        f();
    });
}

function requestPermission() {
  console.log('Requesting permission...');
  return Notification.requestPermission().then((permission) => {
    console.log(permission);
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Unable to get permission to notify.');
    }
    return messaging.getToken();
  });
}

function sendTokenToServer(currentToken) {
  const uid = firebase.auth().currentUser.uid;
  if (!isTokenSentToServer()) {
    console.log('Sending to server', currentToken);
    const clientID = currentToken.slice(0, currentToken.indexOf(':'));
    firebase.database().ref('users/' + uid + '/notificationTokens/' + clientID).set(currentToken);
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server, not sending again unless it changes.');
  }
};

export function enableNotifications() {
  requestPermission()
    .then((currentToken) => {
      console.log(currentToken);
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

export function disableNotifications() {
  messaging.getToken()
    .then((currentToken) => {
      messaging.deleteToken(currentToken).then(() => {
        const uid = firebase.auth().currentUser.uid;
        const clientID = currentToken.slice(0, currentToken.indexOf(':'));
        setTokenSentToServer(false);
        firebase.database().ref('users/' + uid + '/notificationTokens/' + clientID).remove();
        console.log('Token deleted.');
      })
      .catch((err) => {
        console.log('Unable to delete token. ', err);
      });
    })
    .catch((err) => {
      console.log('Error retrieving Instance ID token. ', err);
    });
}
  
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    setTokenSentToServer(false);
    sendTokenToServer(refreshedToken);
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    alert('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage((payload) => {
  console.log(payload);
});