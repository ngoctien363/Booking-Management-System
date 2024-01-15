export const TOKEN_KEY = 'token';
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export function setToken(token, key = TOKEN_KEY) {
    localStorage.setItem(key, token);
}

export function isAuthed(key = TOKEN_KEY) {
    const token = localStorage.getItem(key);
    if (!token) return false;
    // get expire from token payload
    const { exp } = parseJwt(token);
    // const expiresIn = parseInt(exp) * 1000;
    const expiresIn = parseInt(exp) * 1000 ;
    const currentTime = Date.parse(new Date());
    // validate if token is still valid
    return expiresIn > currentTime;
}