const storeToken =  (token, type) =>{
    localStorage[type] = token;
}

const getToken =  type=> {
    return (localStorage[type]);
}

const removeTokens=()=>{
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
}

export { storeToken, getToken,removeTokens }