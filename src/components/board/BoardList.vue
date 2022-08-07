<template>
  <div class="container">
    <h1 class="my-2">게시판</h1>
    <div class="container-fluid d-flex justify-content-between">
      <div class="container-fluid d-flex justify-content-between">
        <b-form-select class="mb-3" v-model="searchType" :options="searchTypes" placeholder="주제">
        </b-form-select>
         <b-form-select class="mb-3" v-model="boardType" :options="boardTypes" placeholder="주제">
        </b-form-select>
        <b-form-input class="mb-3" v-model="keyword" placeholder="검색어를 입력하세요"></b-form-input>
        <b-button class="mx-2 my-2 d-flex justify-content-center" variant="primary" v-on:click="search(date, keyword, searchType, boardType)">검색</b-button>
      </div>
      <b-button class="mx-2 my-2 d-flex justify-content-end" variant="primary" to="/board/save">글쓰기</b-button>
      <Datepicker range type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date" ></Datepicker>
      <b-button class="mx-2 my-2 d-flex justify-content-center" variant="primary" v-on:click="test(date)">테스트</b-button>
    </div>
    <table id="tableComponent" class="table table-bordered table-striped">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th v-for="(field, index) in titles" :key='index'>
            {{field}}
            <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
          </th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="(lines, index) in boards" :key="index">
          <td>{{ lines.boardNo }}</td>
          <td><a v-on:click="detail(lines.boardNo)">{{ lines.title }}</a></td>
          <td>{{ lines.boardType }}</td>
          <td>{{ lines.writeDate }}</td>
          <td>{{ lines.writer }}</td>
        </tr>
      </tbody>
    </table>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        :totalPages="totalPages"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
        @click="movePage(currentPage-1)"
      ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'

const url = 'http://localhost:8080'

export default {
  components: { Datepicker },
  name: 'TableComponent',
  data () {
    return {
      titles: ['번호', '제목', '분류', '작성일자', '작성자'],
      boards: [],
      page: 0,
      size: 10,
      rows: null,
      perPage: 10,
      totalPages: null,
      requestBody: {},
      boardNo: null,
      searchTypes: [
        { value: null, text: '검색 분류' },
        { value: 'All', text: '전체' },
        { value: 'TITLE', text: '제목' },
        { value: 'WRITER', text: '작성자' },
        { value: 'CONTENT', text: '내용' }
      ],
      boardTypes: [
        { value: 'NOTICE', text: '공지사항' },
        { value: 'NORMAL', text: '일반' },
        { value: 'QUESTION', text: '질문' },
        { value: 'ANSWER', text: '답변' },
        { value: 'All', text: '전체' }
      ]
    }
  },
  methods: {
    nowData (page) {
      const _app = this
      this.requestBody = {
        boardNo: this.boardNo
      }
      return axios.get(url + '/api/v1/board/list?page=' + page + '&size=10', {
        headers: this.requestBody
      })
        .then(res => {
          console.log(res)
          _app.$data.boards = res.data.data.content
          _app.$data.totalPages = res.data.data.totalPages
          _app.$data.rows = res.data.data.totalElements
        })
    },
    movePage (page) {
      this.nowData(page)
    },
    detail (boardNo) {
      this.requestBody.boardNo = boardNo
      console.log(boardNo)
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    test (date) {
      let startDate = date[0]
      let endDate = date[1]
      startDate = dayjs(startDate).format('YYYY-MM-DD')
      endDate = dayjs(endDate).format('YYYY-MM-DD')
      console.log(startDate)
      console.log(endDate)
    },
    search (date) {
      let startDate = date[0]
      let endDate = date[1]
      console.log(this.searchType)
      console.log(this.boardType)
      startDate = dayjs(startDate).format('YYYY-MM-DD')
      endDate = dayjs(endDate).format('YYYY-MM-DD')
      const keyword = this.keyword
      const searchType = this.searchType
      const boardType = this.boardType
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      return axios.get(url + '/api/v1/board/search?startDate=' + startDate + '&endDate=' + endDate + '&keyword=' + keyword + '&searchType=' + searchType + '&boardType=' + boardType, config)
        .then(res => {
          const _app = this
          console.log(res)
          _app.$data.boards = res.data.data.content
          _app.$data.totalPages = res.data.data.totalPages
          _app.$data.rows = res.data.data.totalElements
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.nowData(this.page)
  }
}
</script>
