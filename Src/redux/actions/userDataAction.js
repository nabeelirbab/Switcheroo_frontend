import {
  TOTALSCORE,
  MATCHINGITEM,
  ISFIRSTINSTALL,
  NOTIFICATIONCOUNT,
  MESSAGECOUNT
} from '../types';

export const savePoints = data => {
  return {
    type: TOTALSCORE,
    payload: data,
  };
};

export const Savematchingitem = data => {

  console.log('datadatadata', data);
  return {
    type: MATCHINGITEM,
    payload: data,
  };
};
export const saveisFirstinstall = data => {
  return {
    type: ISFIRSTINSTALL,
    payload: data,
  };
};


export const addNotificationcount = data => {
  return {
    type: NOTIFICATIONCOUNT,
    payload: data,
  };
};


export const addmessageCount = data => {
  return {
    type: MESSAGECOUNT,
    payload: data,
  };
};
