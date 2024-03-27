export function SetLoggedInUsername(username) {
  console.log('In set function')
  console.log(username)
  localStorage.setItem('loggedInUsername', username);
}
export function getLoggedInUsername() {

    console.log('In get function')
    return localStorage.getItem('loggedInUsername');
}

export function ClearLoggedInUsername() {
  localStorage.removeItem('loggedInUsername');
}