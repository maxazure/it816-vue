// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

export function getToken() {
//   return Cookies.get(TokenKey)
    return localStorage.getItem("token")
  
}

export function setToken(token) {
//   return Cookies.set(TokenKey, token)
    localStorage.setItem("token", token);
    return true
}

export function removeToken() {
//   return Cookies.remove(TokenKey)
    // localStorage.token = null
    localStorage.removeItem("user");
    localStorage.removeItem("max_login");
    return localStorage.removeItem("token")
}

export function getUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
export function setUser(user) {
        return localStorage.setItem("user", JSON.stringify(user))
    }
