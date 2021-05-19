window.onload = function() {
  console.log("window", window);

  firebase.initializeApp({
    apiKey: "AIzaSyCE-rYQhh3BYYNK72_938ATpk7QwlOgyB0",
    authDomain: "book-concierge-tbr.firebaseapp.com",
    projectId: "book-concierge-tbr",
    storageBucket: "book-concierge-tbr.appspot.com",
    messagingSenderId: "540759665824",
    appId: "1:540759665824:web:e10ed7bab9ae785284edc5",
    measurementId: "G-VNQPF6M7GS"
  });

  const auth = firebase.auth();
  // firestore and functions is not set up 
  //const firestore = firebase.firestore();
  //const functions = firebase.functions();

  if (window.location.hostname.includes("localhost")) {
  auth.useEmulator("http://localhost:9099");
  // firestore.useEmulator("localhost", 8080);
  // functions.useEmulator("localhost", 5001);
  }


  /**
   * Function called when clicking the Login/Logout button.
   */
  function toggleSignIn() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        document.getElementById('quickstart-oauthtoken').textContent = token;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
    } else {
      firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
  }

  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      } else {
        // User is signed out.
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        document.getElementById('quickstart-account-details').textContent = 'null';
        document.getElementById('quickstart-oauthtoken').textContent = 'null';
      }
      document.getElementById('quickstart-sign-in').disabled = false;
    });

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  }


    console.log("window", window);
    initApp();
    
};

