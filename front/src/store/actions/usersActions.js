import usersSlice from "../slices/usersSlice";

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess
} = usersSlice.actions;