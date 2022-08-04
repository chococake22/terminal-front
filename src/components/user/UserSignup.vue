<template>
  <div class="container">
    <b-card>
      <div>
        <b-form>
          <label for="text-userId">ID</label>
          <b-form-input
            type="text"
            v-model="userId"
            id="text-id"
            aria-describedby="userId-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-password">Password</label>
          <b-form-input
            type="password"
            v-model="password"
            id="text-password"
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-chkPwd">PasswordCheck</label>
          <b-form-input
            type="password"
            v-model="chkPwd"
            id="text-chkPwd"
            aria-describedby="chkPwd-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-username">Name</label>
          <b-form-input
            type="text"
            v-model="username"
            id="text-username"
            aria-describedby="username-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-email">Email</label>
            <b-form-input
            type="text"
            v-model="email"
            id="text-email"
            aria-describedby="email-help-block">
            </b-form-input>
            <b-form>
              <label for="text-phone">Phone</label>
              <b-form-input
                type="text"
                v-model="phone"
                id="text-phone"
                aria-describedby="phone-help-block"
              ></b-form-input>
            </b-form>
        </b-form>
      </div>
      <b-button class="my-4" variant="primary" v-on:click="signup({ userId, password, chkPwd, username, email, phone })">회원가입</b-button>
    </b-card>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      userId: null,
      password: null,
      chkPwd: null,
      username: null,
      email: null,
      phone: null
    }
  },
  computed: {
    ...mapState(['loggedIn', 'userInfo'])
  },
  methods: {
    ...mapActions(['signup'])
  }
}
</script>
