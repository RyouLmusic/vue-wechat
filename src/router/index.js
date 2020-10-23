import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ChatList from '@/views/ChatList'
import FriendsList from '@/views/FriendsList'
import Oneself from '@/views/Oneself'
import UpdateUsername from '@/views/UpdateUsername'
import QrCode from '@/views/QrCode'
import AddFriend from '@/views/AddFriend'
import FriendDetail from '@/views/FriendDetail'
import Chat from '@/views/Chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chatList',
    name: 'ChatList',
    component: ChatList
  },
  {
    path: '/friendsList',
    name: 'FriendsList',
    component: FriendsList
  },
  {
    path: '/oneself',
    name: 'Oneself',
    component: Oneself
  },
  {
    path: '/updateUsername',
    name: 'UpdateUsername',
    component: UpdateUsername
  },
  {
    path: '/qrCode',
    name: 'QrCode',
    component: QrCode
  },
  {
    path: '/addFriend',
    name: 'AddFriend',
    component: AddFriend
  },
  {
    path: '/friendDetail',
    name: 'FriendDetail',
    component: FriendDetail
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
