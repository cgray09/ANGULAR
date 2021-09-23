// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  firebaseConfig:
  {
    apiKey: "AIzaSyCRonxuqVDMbVjXfqiN9kWqxJodj5WtSbU",
    authDomain: "ebooks-d2841.firebaseapp.com",
    databaseURL: "https://ebooks-d2841-default-rtdb.firebaseio.com",
    projectId: "ebooks-d2841",
    storageBucket: "ebooks-d2841.appspot.com",
    messagingSenderId: "1070132107590",
    appId: "1:1070132107590:web:5b99c946c0b2633792ad47"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
