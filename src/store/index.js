import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'

const url = 'http://localhost:8080'

export default createStore({
  state: {
    userInfo: [],
    loggedIn: null,
    isLogin: false,
    isLoginError: false
  },
  getters: {
    getUserPwd: function (state) {
      return state.userInfo.password
    }
  },
  mutations: {
    loginSuccess (state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
      state.loggedIn = localStorage.getItem('userNo')
    },
    loginError (state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout (state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
      localStorage.removeItem('userNo')
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
      location.reload()
    }
  },
  actions: {
    login ({ dispatch }, loginObj) {
      axios
        .post(url + '/api/v1/user/login', loginObj)
        .then(res => {
          const token = res.data.data.accessToken
          const userNo = res.data.data.userNo
          const userId = res.data.data.userId
          console.log(res)
          localStorage.setItem('accessToken', token)
          localStorage.setItem('userNo', userNo)
          localStorage.setItem('userId', userId)
          dispatch('getMemberInfo')
        })
        .catch(err => {
          console.log(err)
          alert('아이디 혹은 비밀번호가 틀렸습니다.')
        })
    },
    logout ({ commit }) {
      console.log('로그아웃')
      commit('logout')
    },
    signup ({ commit }, signupObj) {
      axios
        .post(url + '/api/v1/user', signupObj)
        .then(res => {
          alert('회원가입이 완료되었습니다.')
          router.push('/')
        })
        .catch(() => {
          alert('입력사항을 확인하세요.')
        })
    },
    update ({ commit }, updateObj) {
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      axios
        .put(url + '/api/v1/user', updateObj, config)
        .then(res => {
          alert('수정되었습니다')
          this.state.userInfo.password = updateObj.password
          this.state.userInfo.email = updateObj.email
          this.state.userInfo.phone = updateObj.phone
          router.push('/')
        })
        .catch(() => {
          alert('잘못')
        })
    },
    getMemberInfo ({ commit }) {
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          accesstoken: token,
          userNo: userNo
        }
      }
      axios
        .get(url + '/api/v1/user/' + userNo, config)
        .then(res => {
          const userInfo = {
            userNo: res.data.data.userNo,
            userId: res.data.data.userId,
            username: res.data.data.username,
            email: res.data.data.email,
            phone: res.data.data.phone
          }
          console.log(userInfo)
          console.log(config)
          commit('loginSuccess', userInfo)
          router.push('/')
        })
        .catch(() => {
          alert('아이디 또는 비밀번호를 확인하세요.')
        })
    }
  }
})
