// 1. 引入对应模块
import Vue from 'vue'
import VueRouter  from 'vue-router'

const Home = ()=> import('./../pages/Home/Home');
const Post = ()=> import('./../pages/Post/Post');
const Map = ()=> import('./../pages/Map/Map');
const Search = ()=> import('./../pages/Search/Search');
const FoundGoods = ()=> import('./../pages/FoundGoods/FoundGoods');
const LostGoods = ()=> import('./../pages/LostGoods/LostGoods');
const Me = ()=> import('./../pages/Me/Me');
const OtherUser = ()=> import('./../pages/OtherUser/OtherUser');
const Login = ()=> import('./../pages/Login/Login');
const Register = ()=> import('./../pages/Register/Register');

import Found from '../pages/Home/Children/Found/Found'
import Lost from '../pages/Home/Children/Lost/Lost'
import MeDetail from '../pages/Me/Children/MeDetail/MeDetail'
import MyLostPost from '../pages/Me/Children/MyLostPost/MyLostPost'
import MyFoundPost from '../pages/Me/Children/MyFoundPost/MyFoundPost'
import MyPostFoundGoods from '../pages/Me/Children/MyPostFoundGoods/MyPostFoundGoods'
import MyPostLostGoods from '../pages/Me/Children/MyPostLostGoods/MyPostLostGoods'
import ChangeEmail from '../pages/Me/Children/ChangeEmail/ChangeEmail'
import UserLostPost from '../pages/OtherUser/Children/UserLostPost/UserLostPost'
import UserFoundPost from '../pages/OtherUser/Children/UserFoundPost/UserFoundPost'

// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default  new VueRouter({
    // 3.1 配置一级路由
    routes: [
      {
        path: '/home',
        component: Home,
        children: [
          // 失物版块
          {path: 'found/:type', component: Found},
          // 寻物版块
          {path: 'lost/:type', component: Lost},
          {path: '/home',redirect: '/home/found/all'}
        ],
      },
      {
        path: '/post',
        component: Post,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/map',
        component: Map,
      },
      {
        path: '/choosemap',
        component: Map,
      },
      {
        path: '/viewmap',
        component: Map,
      },
      {
        path: '/search',
        component: Search,
      },
      {
        path: '/foundgoods/:id',
        component: FoundGoods,
      },
      {
        path: '/lostgoods/:id',
        component: LostGoods,
      },
      {
        path: '/me',
        component: Me,
      },
      {
        path: '/myfoundpost',
        component: MyFoundPost
      },
      {
        path: '/mylostpost',
        component: MyLostPost
      },
      {
        path: '/detail',
        component: MeDetail
      },
      {
        path: '/changeemail',
        component: ChangeEmail
      },
      {
        path: '/mypostfoundgoods/:id',
        component: MyPostFoundGoods
      },
      {
        path: '/mypostlostgoods/:id',
        component: MyPostLostGoods
      },
      {
        path: '/user/:id',
        component: OtherUser,
      },
      {
        path: '/userfoundpost',
        component: UserFoundPost
      },
      {
        path: '/userlostpost',
        component: UserLostPost
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/home'
      },
    ]
});
