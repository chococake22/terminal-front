<template>
  <div>
    <p>번호: {{boardNo}}</p>
    <p>제목: {{title}}</p>
    <p>작성자:{{writer}}</p>
    <p>작성일: {{writeDate}}</p>
    <p>수정일: {{modifiedDate}}</p>
    <p>내용: {{content}}</p>
    <b-button class="mx-2 my-2" variant="primary" v-on:click="updateBoard()">수정</b-button>
    <b-button class="mx-2 my-2" variant="primary" v-on:click="deleteBoard()">삭제</b-button>
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
      writeDate: null,
      modifiedDate: null,
      content: null
    }
  },
  created () {
    console.log(this.query)
    this.fnGetView(this.boardNo)
  },
  methods: {
    fnGetView (boardNo) {
      console.log('글번호: ' + this.query.boardNo)// 쿼리로 글번호 받아오기
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
          _app.$data.writeDate = res.data.data.writeDate
          _app.$data.modifiedDate = res.data.data.modifiedDate
          _app.$data.content = res.data.data.content
          console.log('작성완료')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteBoard () {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      if (userId !== this.writer) {
        alert('권한이 없습니다.')
      } else {
        return axios.delete(url + '/api/v1/board/' + this.query.boardNo, config)
          .then(() => {
            console.log('삭제확인')
            const result = confirm('정말 삭제하시겠습니까?')
            if (result === true) {
              alert('삭제되었습니다.')
              this.$router.push('/board/list')
            }
          })
      }
    },
    updateBoard (boardNo) {
      const userId = localStorage.getItem('userId')
      if (userId !== this.writer) {
        alert('권한이 없습니다.')
      } else {
        console.log(this.query)
        this.$router.push({
          path: './update',
          query: this.query
        })
      }
    }
  }
}
</script>
