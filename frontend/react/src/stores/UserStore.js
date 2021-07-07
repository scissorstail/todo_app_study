import { runInAction, makeAutoObservable } from 'mobx';
import axios from '../services/axios'

const tokenName = process.env.REACT_APP_TOKEN_NAME

export default class UserStore {
  state = {
    user: {}
  };

  constructor(root) {
    this.root = root;
    makeAutoObservable(this);
  }

  get user() {
    return this.state.user;
  }

  get isUser() {
    return Boolean(this.state.user.id);
  }

  async userRegister({ email, nickname, password }) {
    try {
      await axios.post('/apis/v1/user/', {
        email,
        nickname,
        password
      })

    } catch (e) {
      console.error(e)
      throw e
    }
  };

  async userlogin({ email, password }) {
    try {
      const { data } = await axios.post('/apis/v1/token/', {
        email,
        password
      })

      if (data.access) {
        localStorage.setItem(tokenName, data.access)
      }

      await this.userDetail()
    } catch (e) {
      console.error(e)
      throw e
    }
  };

  async userDetail() {
    try {
      const { data } = await axios.get('/apis/v1/user/detail/')

      if (data) {
        runInAction(() => {
          this.state.user = data
        })
      }
    } catch (e) {
      console.error(e)
      localStorage.removeItem(tokenName)
      throw e
    }
  };

  async userDetailPatch(payload) {
    try {
      await axios.patch(`/apis/v1/user/detail_update/`, payload)

      await this.userDetail()
    } catch (e) {
      console.error(e)
      throw e
    }
  };

  async userLogout() {
    localStorage.removeItem(tokenName)
    window.location.reload()
  };

}
