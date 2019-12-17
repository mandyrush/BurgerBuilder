import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    };
};

const setAuthRedirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    };
};

export default reducer;