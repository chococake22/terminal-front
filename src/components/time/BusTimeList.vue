<template>
  <div class="container">
    시간표
    <b-button class="mx-2 my-2" variant="primary" to="/bustime/save" v-if="role === 'ADMIN'">추가</b-button>
    <h1>{{userInfo}}</h1>
    <b-card>
    <b-form-select v-model="ex1Selected" :options="ex1Options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ ex1Selected }}</strong></div>
  </b-card>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      ex1Options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled' }
      ]
    }
  },
  computed: {
    ...mapState(['loggedIn', 'userInfo', 'role'])
  }
}
</script>
