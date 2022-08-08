import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import BusTimeList from '@/components/time/BusTimeList.vue'
import BusTimeSave from '@/components/time/BusTimeSave.vue'
import BoardList from '@/components/board/BoardList.vue'
import BoardSave from '@/components/board/BoardSave.vue'
import BoardDetail from '@/components/board/BoardDetail.vue'
import BoardUpdate from '@/components/board/BoardUpdate.vue'
import TerminalLocation from '@/components/location/TerminalLocation.vue'
import UserMypage from '@/components/user/UserMypage.vue'
import UserSignup from '@/components/user/UserSignup.vue'
import UserUpdate from '@/components/user/UserUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/bustime/list',
    name: 'BusTimeList',
    component: BusTimeList
  },
  {
    path: '/bustime/save',
    name: 'BusTimeSave',
    component: BusTimeSave
  },
  {
    path: '/board/list',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/location',
    name: 'location',
    component: TerminalLocation
  },
  {
    path: '/user/mypage',
    name: 'UserMypage',
    component: UserMypage
  },
  {
    path: '/user/signup',
    name: 'UserSignup',
    component: UserSignup
  },
  {
    path: '/user/update',
    name: 'UserUpdate',
    component: UserUpdate
  },
  {
    path: '/board/save',
    name: 'BoardSave',
    component: BoardSave
  },
  {
    path: '/board/detail',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path: '/board/update',
    name: 'BoardUpdate',
    component: BoardUpdate
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
