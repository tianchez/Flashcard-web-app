const initState = {}

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_QUIZ_SUCCESS':
      console.log('create quiz success');
      let userQuiz = state.userQuiz ? state.userQuiz : [];
      state.userQuiz = [...userQuiz, action.new_quiz];
      return state;
    case 'CREATE_QUIZ_ERROR':
      console.log('create quiz error');
      console.log(action.err);
      return state;
    case 'GET_USER_QUIZ_SUCCESS':
      console.log('get quiz');
      console.log(action.response);
      return{
        ...state,
        userQuiz: action.response,
        quizError: null
      };
    case 'GET_USER_QUIZ_ERROR':
      console.log('get quiz error');
      console.log(action.err);
      return{
        ...state,
        quizError: action.err
      };
    case 'GET_QUIZ_SUCCESS':
      console.log('get quiz');
      console.log(action.response);
      return {
        ...state,
        quiz: action.response
      };
    case 'GET_QUIZ_ERROR':
      console.log('get quiz error');
      console.log(action.err);
      state.quizError = action.err;
      return state;
    case 'GET_CARD_SUCCESS':
      console.log('get card');
      console.log(action.response);
      state.cards = action.response;
      return state;
    case 'GET_CARD_ERROR':
      console.log('get card error');
      console.log(action.err);
      return{
        ...state,
        cardError: action.err
      };
    default:
      return state;
  }
};

export default quizReducer;