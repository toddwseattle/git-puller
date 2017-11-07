import * as SECRETS from '../../secrets';
export const environment = {
  production: true,
  firebase: {
    apiKey: SECRETS.FIREBASE_APIKEY,
    authDomain: 'git-puller.firebaseapp.com',
    databaseURL: 'https://git-puller.firebaseio.com',
    projectId: 'git-puller',
    storageBucket: 'git-puller.appspot.com',
    messagingSenderId: '49027776913'
  }
};
