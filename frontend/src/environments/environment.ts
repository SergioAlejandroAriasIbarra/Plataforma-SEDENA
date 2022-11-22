// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Initialize Firebase
export const environment = {
  firebase: {
    projectId: 'sedena-e5',
    appId: '1:919180900546:web:44623af82b938fcd4fa35b',
    databaseURL: 'https://sedena-e5-default-rtdb.firebaseio.com',
    storageBucket: 'sedena-e5.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCO_qJlaraxS-jh80pZWTEeueVl2eK0aDE',
    authDomain: 'sedena-e5.firebaseapp.com',
    messagingSenderId: '919180900546',
  },
    production: false
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.