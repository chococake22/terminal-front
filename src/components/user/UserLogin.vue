<template>
  <div>
    <div class="m-5" v-if="loggedIn === null">
      <b-form-input
          v-model="userId"
          placeholder="ID"
          trim
        ></b-form-input>
        <b-form-input
          class="my-3"
          v-model="password"
          type="password"
          placeholder="Password"
          trim
        ></b-form-input>
        <b-button class="m-3" variant="primary" v-on:click="login({userId, password})">로그인</b-button>
    </div>
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
    ...mapState(['loggedIn'])
  },
  methods: {
    ...mapActions(['login', 'logout'])
  }
}
</script>
