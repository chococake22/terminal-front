<template>
  <div class="container">
    <h1 class="my-2">게시판</h1>
    <div class="container-fluid d-flex justify-content-end">
      <b-button class="mx-2 my-2" variant="primary" to="/boardsave">글쓰기</b-button>
    </div>
    <table id="tableComponent" class="table table-bordered table-striped">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th  v-for="(field, index) in titles" :key='index'>
            {{field}} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
          </th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="(lines, index) in boards" :key="index">
          <td v-for="(con, index) in lines" :key="index">{{con}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

const url = 'http://localhost:8080'

export default {
  name: 'TableComponent',
  data () {
    return {
      titles: ['번호', '제목', '분류', '작성일자', '작성자'],
      boards: []
    }
  },
  created: function () {
    const _app = this
    return axios.get(url + '/api/v1/board/list?page=0&size=10')
      .then(res => {
        console.log(res)
        _app.$data.boards = res.data.data.content
      })
  }
}
</script>
