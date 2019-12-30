<template>
  <div class="me">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="我的主页"
      left-arrow
      @click-left="goBack"
    />
    <div class="user-info-content">
      <div class="content">
        <img :src="userInfo.avatar" v-if="userInfo.avatar">
        <img src="@/images/user.jpg" v-else>
        <div class="user-info-body">
          <p>用户名&nbsp;&nbsp;{{ userInfo.user_name }}</p>
          <p>学号&nbsp;&nbsp;{{ userInfo.sid }}</p>
          <p v-if="userInfo.phone">手机&nbsp;&nbsp;{{ userInfo.phone }}</p>
          <p v-if="userInfo.e_mail">邮箱&nbsp;&nbsp;{{ userInfo.e_mail }}</p>
          <p class="edit"> 
            <router-link to="/me/detail" tag="span">编辑个人资料<svg t="1577347957708" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2493" width="15" height="15"><path d="M812.8 992h-640c-89.6 0-160-70.4-160-160V192c0-89.6 70.4-160 160-160h492.8c19.2 0 38.4 12.8 38.4 32s-12.8 32-32 32H172.8c-51.2 0-89.6 44.8-89.6 96v640c0 51.2 44.8 96 96 96h640c51.2 0 96-44.8 96-96V396.8c0-19.2 12.8-32 32-32s32 12.8 32 32V832c-6.4 89.6-76.8 160-166.4 160z" p-id="2494" fill="#ffffff"></path><path d="M275.2 768c-6.4 0-19.2-6.4-25.6-12.8-12.8-12.8-12.8-32 0-44.8l704-640c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8l-704 640C288 768 281.6 768 275.2 768z" p-id="2495" fill="#ffffff"></path></svg></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="options-content">
      <router-link :to="{path: `/me/post/found`}" tag="div" class="options">
        <h3>我发布的失物招领</h3>
        <span><i class="mui-icon mui-icon-forward"></i></span>
      </router-link>
      <router-link :to="{path: `/me/post/lost`}" tag="div" class="options">
        <h3>我发布的寻物启事</h3>
        <span><i class="mui-icon mui-icon-forward"></i></span>
      </router-link>
    </div>
    <div class="logout-btn"><van-button type="danger" size="large" @click="logout">退出登录</van-button></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import {Dialog, Toast} from 'vant';

  export default {
    name: "Me",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(["reqLogOut"]),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      logout(){
        Dialog.confirm({
          title: '确认',
          message: '您是否要退出登录？'
        }).then(() => {
          // 退出登录
          this.reqLogOut({});
          // 回到主界面
          this.$router.replace('/home');
          Toast.success('退出成功!')
        }).catch(() => {
          // on cancel
        });
      },
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .me{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    .van-nav-bar {
       z-index: 99;
       background: #f5f5f5;
       border-bottom: 1px solid #D4D4D4;
    }
    .user-info-content{
      padding-top: 2rem;
      width: 100%;
      box-sizing: border-box;
      .content{
        margin: 0 auto;
        padding: 1rem 1.5rem;
        width: 90%;
        min-height: 12rem;
        background: rgb(65, 189, 244);
        border-radius: 10px;

        display: flex;
        align-items: center;
        svg{
          margin-left: 1rem;
        }
        img{
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
        }
        .user-info-body{
          margin-left: 2rem;
          color: #fff;
          p{
            margin-bottom: .5rem;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          .edit{
            margin-top: 1rem;
            font-size: 16px;
          }
        }
      }
    }
    .options-content{
      margin: 4rem auto;
      padding: 0 2rem;
      .options{
        padding: 1rem;
        font-size: 16px;
        color: #333;
        border-top: 1px solid #d4d4d4;
        border-bottom: 1px solid #d4d4d4;
        &:first-child{
          border-bottom: none;
        }
      }
    }
    .logout-btn{
      text-align: center;
      .van-button--large{
        width: 80%;
        height: 45px !important;
        line-height: 45px !important;
        font-size: 18px;
        background: #ea3c50;
      }
    }
  }
</style>
