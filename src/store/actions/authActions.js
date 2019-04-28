export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((res) => {
      return firestore.collection('users').doc(res.user.uid).get().then((doc) => {
        let response = doc.data();
        dispatch({ type: 'LOGIN_SUCCESS' , response});
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}


export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(newUser);
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        quizes:[],
        score:[]
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS', newUser});
    }).catch((err) => {
      console.log(err);
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const getInitial = (userID) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore.collection('users').doc(userID).get().then((doc) => {
        let response = doc.data();
        dispatch({ type: 'GET_INITIAL' , response});
      }).catch((err) => {
        dispatch({ type: 'GET_INITIAL_ERROR', err });
      });
    }
  }
