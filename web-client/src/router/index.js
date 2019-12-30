import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/Login/Login');
const Home = () => import('@/views/Home/Home');
const Post = () => import('@/views/Post/Post');
const Map = () => import('@/views/Map/Map');
const Me = () => import('@/views/Me/Me');
const User = () => import('@/views/User/User');
const Goods = () => import('@/views/Goods/Goods');
const Search = () => import('@/views/Search/Search');
const StudentsCard = () => import('@/views/StudentsCard/StudentsCard');

const MeDetail = () => import('@/views/Me/Children/MeDetail'); 
const MyPost = () => import('@/views/Me/Children/MyPost'); 
const UserPost = () => import('@/views/User/Children/UserPost'); 

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/post',
        component: Post
      },
      {
        path: '/choose_map',
        component: Map
      },
      {
        path: '/view_map',
        component: Map
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/me',
        component: Me
      },
      {
        path: '/me/detail',
        component: MeDetail
      },
      {
        path: '/me/post/:type',
        component: MyPost
      },
      {
        path: '/user/:sid',
        component: User
      },
      {
        path: '/user/post/:type',
        component: UserPost
      },
      {
        path: '/goods/:id',
        component: Goods
      },
      {
        path: '/students_card/:month',
        component: StudentsCard
      },
      {
        path: '/',
        redirect: '/home'
      },
    ]
});