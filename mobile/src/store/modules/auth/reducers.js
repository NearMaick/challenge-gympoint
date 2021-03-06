import produce from 'immer';

import AuthTypes from './types';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  student: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.student = action.payload.student;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case AuthTypes.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.token = null;
        draft.student = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
