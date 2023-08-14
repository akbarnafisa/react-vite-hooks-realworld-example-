import axios from 'axios'
import { isEmpty } from 'lodash-es'
import { useSnapshot, proxy } from 'valtio'

function getAuthUser() {
  try {
    const jwt = window.localStorage.getItem('jwtToken')
    if (!jwt) {
      return {}
    }
    return JSON.parse(atob(jwt))
  } catch (error) {
    return {}
  }
}


const state = proxy({
  authUser: getAuthUser(),
  isAppLoaded: false,
  get isAuth() {
    return !isEmpty(state.authUser)
  },
})

function setCredential(user) {
  state.authUser = user
  axios.defaults.headers.Authorization = `Token ${state.authUser.token}`
}

const actions = {
  loadApp: () => {
    const authUser = getAuthUser()
    if (!isEmpty(authUser)) {
      setCredential(authUser)
    }

    state.isAppLoaded = true
  },
  login: (user) => {
    setCredential(user)
    window.localStorage.setItem('jwtToken', btoa(JSON.stringify(user)))
  },
  logout: () => {
    state.authUser = {}
    window.localStorage.removeItem('jwtToken')
  },
  checkAuth: () => {
    const authUser = getAuthUser()

    if (!authUser || isEmpty(authUser)) {
      actions.logout()
    }
  },
}

function useAuth() {
  const snap = useSnapshot(state)
  return {
    ...snap,
    ...actions,
  }
}

export default useAuth
