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
      console.log('get user quiz');
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
        quiz: action.response,
        cards: action.response.cards
      };
    case 'GET_QUIZ_ERROR':
      console.log('get quiz error');
      console.log(action.err);
      state.quizError = action.err;
      return state;
    case 'ADD_CARD_SUCCESS':
      console.log('add card');
      let cards = state.cards ? state.cards : [];
      state.cards = [...cards,action.new_card];
      return state;
    case 'GET_CARD_ERROR':
      console.log('get card error');
      console.log(action.err);
      return{
        ...state,
        cardError: action.err
      };
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
    case 'UPDATE_CARDLIST_SUCCESS':
      console.log('update card successfully');
      state.cards = action.new_cardList;
      return state;
    case 'UPDATE_CARDLIST_ERROR':
      console.log('update card error');
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