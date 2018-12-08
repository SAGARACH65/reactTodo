const storeToken = function (token, type) {
    localStorage[type] = token;
}

const getToken = function (type) {
    return (localStorage[type]);
}

export { storeToken, getToken }