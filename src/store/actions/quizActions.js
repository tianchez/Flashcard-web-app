export const createQuiz = (name, description) => {
  const randomString =(length_)=> {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    var str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const quizId = randomString(15);
    console.log("new quizId: "+quizId);
    // add new quiz
    firestore.collection('quiz').doc(quizId).set({
      name: name,
      description: description,
      cards: [],
      scores: [],
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      // Add quiz in user
      let new_quiz = {
        quizId: quizId,
        name: name,
        description: description
      };
      firestore.collection('users').doc(authorId).update({
        quizes: firestore.FieldValue.arrayUnion(new_quiz)
      }).then(()=>{
        dispatch({ type: 'CREATE_QUIZ_SUCCESS', new_quiz});
      }).catch(err => {
        dispatch({ type: 'CREATE_QUIZ_ERROR' }, err);
      });
    }).catch(err => {
      console.log(err);
      dispatch({ type: 'CREATE_QUIZ_ERROR' }, err);
    });
  }
};

// Get quiz for certain user
export const getUserQuiz = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    if (authorId){
      firestore.collection('users').doc(authorId).get().then((doc) => {
        let response = doc.data().quizes;
        dispatch({ type: 'GET_USER_QUIZ_SUCCESS',response});
      }).catch(err => {
        console.log(err);
        dispatch({ type: 'GET_USER_QUIZ_ERROR',err});
      });
    }
    else{
        dispatch({ type: 'GET_USER_QUIZ_ERROR', err: "Need to login first"});
    }
  }
};

// get quiz by quiz id
export const getQuiz = (quizId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('quiz').doc(quizId).get().then((doc) => {
        let response = doc.data();
        dispatch({ type: 'GET_QUIZ_SUCCESS',response});
      }).catch(err => {
        console.log(err);
        dispatch({ type: 'GET_QUIZ_ERROR',err});
    });
  }
};

// add card by quiz id
export const addCard = (quizId, new_card) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('quiz').doc(quizId).update({
      cards: firestore.FieldValue.arrayUnion(new_card)
      }).then(() => {
        dispatch({ type: 'ADD_CARD_SUCCESS',new_card});
      }).catch(err => {
        console.log(err);
        dispatch({ type: 'ADD_CARD_ERROR',err});
    });
  }
};

export const getCards = (quizId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('quiz').doc(quizId).get().then((doc) => {
        let response = doc.data().cards;
        dispatch({ type: 'GET_CARD_SUCCESS',response});
      }).catch(err => {
        console.log(err);
        dispatch({ type: 'GET_CARD_ERROR',err});
    });
  }
};

export const updateCardList = (quizId, new_cardList) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('quiz').doc(quizId).update({
      cards: new_cardList
      }).then(() => {
        dispatch({ type: 'UPDATE_CARDLIST_SUCCESS',new_cardList});
      }).catch(err => {
        console.log(err);
        dispatch({ type: 'UPDATE_CARDLIST_ERROR',err});
    });
  }
};
