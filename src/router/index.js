import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import TimeList from '@/components/time/TimeList.vue'
import BoardList from '@/components/board/BoardList.vue'
import BoardSave from '@/components/board/BoardSave.vue'
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
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/bustime',
    name: 'bustime',
    component: TimeList
  },
  {
    path: '/board',
    name: 'board',
    component: BoardList
  },
  {
    path: '/location',
    name: 'location',
    component: TerminalLocation
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: UserMypage
  },
  {
    path: '/signup',
    name: 'signup',
    component: UserSignup
  },
  {
    path: '/userupdate',
    name: 'userupdate',
    component: UserUpdate
  },
  {
    path: '/boardsave',
    name: 'boardsave',
    component: BoardSave
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
