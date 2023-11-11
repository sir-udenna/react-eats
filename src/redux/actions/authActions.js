export const loginSuccess = (user, token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user,
        token,
    },
});

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
})

export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
});

