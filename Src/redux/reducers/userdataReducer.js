import {
  TOTALSCORE,
  MATCHINGITEM,
  ISFIRSTINSTALL,
  MESSAGECOUNT,
  NOTIFICATIONCOUNT
} from '../types';
const initState = {
  totalScore: 0,
  matchingItems: null,
  firstinstall: true,
  notificationCount: 0,
  messageCount: 0

};
const userdataReducer = (state = initState, action) => {
  console.log('state of redux', state);
  switch (action.type) {
    case TOTALSCORE:
      return {
        ...state,
        totalScore: action.payload,
      };
    case MATCHINGITEM:
      return {
        ...state,
        matchingItems: action.payload,
      };
    case ISFIRSTINSTALL:
      return {
        ...state,
        firstinstall: action.payload,
      };
    case MESSAGECOUNT:
      return {
        ...state,
        messageCount: action.payload,
      };
    case NOTIFICATIONCOUNT:
      return {
        ...state,
        notificationCount: action.payload,
      };
    default:
      return state;
  }
};

export default userdataReducer;
