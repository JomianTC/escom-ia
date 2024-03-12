export const setLocalStorage = (key, value) => {
    localStorage.setItem("user_state", JSON.stringify({ ...value }))
}

export const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
}