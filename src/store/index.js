import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

const url = 'http://localhost:8080'

export default createStore({
  // 로그아웃 후에도 state 상태 유지
  plugins: [createPersistedState()],
  state: {
    userInfo: [],
    loggedIn: null,
    isLogin: false,
    isLoginError: false,
    role: null
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
      state.role = state.userInfo.role
    },
    loginError (state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout (state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
      state.loggedIn = null
      state.role = null
      localStorage.removeItem('userNo')
      localStorage.removeItem('userId')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
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
          console.log('로그인')
          console.log(res)
          // 토큰 정보를 로컬 스토리지에 저장
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
      router.push('/')
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
      // 로컬 스토리지에 저장되어 있는 토큰을 불러오기
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
            phone: res.data.data.phone,
            role: res.data.data.role
          }
          if (userInfo.role === 'ADMIN') {
            localStorage.setItem('role', userInfo.role)
          }
          console.log('회원정보')
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
