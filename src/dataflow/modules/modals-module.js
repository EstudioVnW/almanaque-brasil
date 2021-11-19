const SET_MODAL =  'almanaque/modals/SET_MODAL';
const CLEAR_MODALS_STATE =  'almanaque/modals/CLEAR_MODALS_STATE';
const SET_MODAL_IS_ACTIVITY_LIMIT = 'almanaque/modals/SET_MODAL_IS_ACTIVITY_LIMIT';

const initialState = {
  welcomeModal: {
    wasShowed: false
  },
  isActivityLimit: undefined
}

export default function foo(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL: {
      return Object.assign({}, state, {
        ...state,
        [action.info.modal]: {
          wasShowed: action.info.wasShowed
        }
      })
    }

    case CLEAR_MODALS_STATE: {
      return Object.assign({}, state, {
        welcomeModal: {
          wasShowed: false
        }
      })
    }
    case SET_MODAL_IS_ACTIVITY_LIMIT: {
      return Object.assign({}, state, {
        isActivityLimit: action.info,
      })
    }

    default:
      return state;
  }
}

//Actions
export const setModal = (info) => {
  return {
    type: SET_MODAL,
    info,
  }
};

export const clearModalsState = () => {
  return {
    type: CLEAR_MODALS_STATE,
  }
}

export const setIsModalActivityLimit = (info) => {
  return {
    type: SET_MODAL_IS_ACTIVITY_LIMIT,
    info,
  }
}
