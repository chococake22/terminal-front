<template>
  <div>
    <p>번호: {{boardNo}}</p>
    <input type="text" v-model="title" placeholder="제목">
    <p>작성자:{{writer}}</p>
    <input type="text" v-model="content" placeholder="내용"> <br>
    <b-button class="mx-2 my-2" variant="primary" v-on:click="check(title, content)">확인</b-button>
  </div>
</template>

<script>

import axios from 'axios'

const url = 'http://localhost:8080'

export default {
  data () {
    return {
      query: this.$route.query,
      boardNo: null,
      writer: null,
      title: null,
      content: null
    }
  },
  methods: {
    getBoardData (boardNo) {
      const _app = this
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      return axios.get(url + '/api/v1/board/' + this.query.boardNo, config)
        .then(res => {
          _app.$data.boardNo = res.data.data.boardNo
          _app.$data.writer = res.data.data.writer
          _app.$data.title = res.data.data.title
          _app.$data.content = res.data.data.content
          console.log('작성완료')
        })
        .catch(err => {
          console.log(err)
        })
    },
    check (title, content) {
      console.log(title, content)
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const updateObj = {
        title: this.title,
        content: this.content
      }
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      return axios.put(url + '/api/v1/board/' + this.query.boardNo, updateObj, config)
        .then(res => {
          console.log('수정확인')
          const result = confirm('수정하시겠습니까?')
          if (result === true) {
            alert('수정되었습니다.')
            this.$router.push('/board/detail?boardNo=' + this.query.boardNo)
          }
        })
        .catch(() => {
          alert('오류')
        })
    }
  },
  created () {
    console.log('update 글번호: ' + this.query.boardNo)
    this.getBoardData(this.boardNo)
  }
}
</script>
