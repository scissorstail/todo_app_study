import axios from 'axios'

const tokenName = process.env.REACT_APP_TOKEN_NAME

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const config = {
  baseURL: process.env.REACT_APP_API_URL
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const result = localStorage.getItem(tokenName)
    if (result) {
      config.headers.Authorization = `Bearer ${result}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem(tokenName)) {
        //alert(
        //  '인증 시간이 만료되어 로그인이 해제되었습니다. 다시 로그인해주시기 바랍니다'
        //)

        localStorage.removeItem(tokenName)
        delete axios.defaults.headers.common.Authorization
      }
    } else if (!error.response) {
      // alert(
      //   '네트워크 접속 상태가 불안정합니다. 잠시 후 다시 시도해주시기 바랍니다'
      // )
    }

    return Promise.reject(error)
  }
)

export default _axios
