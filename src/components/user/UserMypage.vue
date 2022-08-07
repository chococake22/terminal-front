<template>
  <div>
    <p>아이디 : {{ userInfo.userId }}</p>
    <p>이름 : {{ userInfo.username }}</p>
    <p>이메일 : {{ userInfo.email }}</p>
    <p>전화번호 : {{ userInfo.phone }}</p>
    <b-button class="mx-2" variant="primary" to="/user/update">회원정보 변경</b-button>
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
    ...mapActions(['login', 'logout'])
  }
}
</script>
