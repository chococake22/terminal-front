<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-start">
            <ul class="navbar-nav container-fluid d-flex justify-content-center">
                <li class="nav-item">
                  <router-link to="/" class="nav-link">장호원시외버스터미널</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/bustime/list" class="nav-link">시간표</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/board/list" class="nav-link">게시판</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/location" class="nav-link">터미널위치</router-link>
                </li>
              <li class="navbar-nav">
                <div>
                  <b-button-toolbar justify aria-label="Toolbar with justify">
                    <li class="nav-item mx-3" v-if="loggedIn === null">
                      <b-button variant="primary" to="/user/login">로그인</b-button>
                    </li>
                    <li class="nav-item" v-if="loggedIn === null">
                      <b-button variant="primary" to="/user/signup">회원가입</b-button>
                    </li>
                    <li class="nav-item mx-5" v-if="loggedIn !== null">
                      <span class="nav-link">{{ userInfo.username }} 님 환영합니다</span>
                    </li>
                    <li>
                      <div v-if="loggedIn !== null">
                        <b-button class="mx-2" variant="primary" to="/user/mypage">마이페이지</b-button>
                        <b-button variant="primary" v-on:click="logout()">로그아웃</b-button>
                      </div>
                    </li>
                  </b-button-toolbar>
                </div>
              </li>
            </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      userId: null,
      password: null
    }
  },
  computed: {
    ...mapState(['loggedIn', 'userInfo'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}

</script>
