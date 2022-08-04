<template>
  <div class="container">
    <h1 class="my-2">글쓰기</h1>
      <b-card>
        <div>
          <b-form-input class="mb-3" v-model="title" placeholder="제목"></b-form-input>
          <b-form-select class="mb-3" v-model="selectedType" :options="boardTypes" placeholder="주제">
          </b-form-select>
          <b-form-textarea
            id="textarea-no-resize"
            v-model="content"
            placeholder="내용"
            rows="7"
            no-resize
          ></b-form-textarea>
          <b-button class="my-3" variant="primary" v-on:click="boardSave({ title, selectedType, content })">작성</b-button>
        </div>
      </b-card>
  </div>
</template>

<script>

import axios from 'axios'

const url = 'http://localhost:8080'

export default {
  data () {
    return {
      selectedType: null,
      boardTypes: [
        { value: null, text: '분류' },
        { value: 'NOTICE', text: '공지사항' },
        { value: 'NORMAL', text: '일반' },
        { value: 'QUESTION', text: '질문' },
        { value: 'ANSWER', text: '답변' }
      ]
    }
  },
  methods: {
    boardSave (boardObj) {
      return axios.post(url + '/api/v1/board', boardObj)
        .then(res => {
          console.log(res)
          alert('글 작성이 완료되었습니다.')
          this.$router.push('/')
        })
    }
  }
}
</script>
