export function SetToken(token) {
  console.log('In set function')
  console.log(token)
  localStorage.setItem('token', token);
}

export function getToken() {

    console.log('In get function')
    return localStorage.getItem('token');
}

export function clearToken() {
    console.log('In clear token')
  localStorage.removeItem('token');
}