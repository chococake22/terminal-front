<template>
  <div>
    <input type="password"  v-model="password" placeholder="비밀번호">
    <input type="password" v-model="chkPwd" placeholder="비밀번호 확인">
    <input type="text" v-model="email" placeholder="이메일">
    <input type="text" v-model="phone" placeholder="전화번호">
    <b-button class="mx-2" variant="primary" v-on:click="update({password, chkPwd, email, phone})">회원정보 변경</b-button>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      password: null,
      chkPwd: null,
      email: null,
      phone: null
    }
  },
  computed: {
    ...mapState(['loggedIn', 'userInfo']),
    ...mapGetters(['getUserPwd'])
  },
  methods: {
    ...mapActions(['update'])
  }
}
</script>
