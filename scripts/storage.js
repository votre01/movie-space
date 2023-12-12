// Set and get movie movie votes by user on local storage

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}