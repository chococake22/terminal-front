<template>
  <div class="container">
    <h1>버스 시간표 추가</h1>
    <b-card>
      <div>
        <b-form>
          <label for="text-startTarget">출발지</label>
          <b-form-input
            type="text"
            v-model="startTarget"
            id="text-startTarget"
            aria-describedby="startTarget-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-arrivedTarget">목적지</label>
          <b-form-input
            type="text"
            v-model="arrivedTarget"
            id="text-arrivedTarget"
            aria-describedby="arrivedTarget-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-startTime">출발시간</label>
          <b-form-input
            type="time"
            v-model="startTime"
            id="text-startTime"
            aria-describedby="startTime-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-price">요금</label>
          <b-form-input
            type="text"
            v-model="price"
            id="text-price"
            aria-describedby="price-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-layover">경유지</label>
          <b-form-input
            type="text"
            v-model="layover"
            id="text-layover"
            aria-describedby="layover-help-block"
          ></b-form-input>
        </b-form>
        <b-form>
          <label for="text-busCorp">회사</label>
            <b-form-input
            type="text"
            v-model="busCorp"
            id="text-busCorp"
            aria-describedby="busCorp-help-block">
            </b-form-input>
            <b-form>
              <label for="text-note">비고</label>
              <b-form-input
                type="text"
                v-model="note"
                id="text-note"
                aria-describedby="note-help-block"
              ></b-form-input>
            </b-form>
        </b-form>
      </div>
      <b-button class="my-4" variant="primary" v-on:click="save({ startTarget, arrivedTarget, startTime, price, busCorp, layover, note })">등록</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

const url = 'http://localhost:8080'

export default {
  data () {
    return {
      startTarget: null,
      arrivedTarget: null,
      startTime: null,
      price: null,
      busCorp: null,
      layover: null,
      note: null
    }
  },
  methods: {
    save (startTarget, arrivedTarget, startTime, price, busCorp, layover, note) {
      console.log(this.startTarget)
      const token = localStorage.getItem('accessToken')
      const userNo = localStorage.getItem('userNo')
      const config = {
        headers: {
          jwt: token,
          userNo: userNo
        }
      }
      const inputData = {
        startTarget: this.startTarget,
        arrivedTarget: this.arrivedTarget,
        startTime: this.startTime,
        price: this.price,
        busCorp: this.busCorp,
        layover: this.layover,
        note: this.layover
      }
      return axios.post(url + '/api/v1/bustime/admin', inputData, config)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
