<template>
  <div class="user">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="Ta的主页"
      left-arrow
      @click-left="goBack"
    />
    <div class="user-info-content" v-if="otherUserInfo.sid">
      <div class="content">
        <img :src="otherUserInfo.avatar" v-if="otherUserInfo.avatar">
        <img src="@/images/user.jpg" v-else>
        <div class="user-info-body">
          <p>用户名&nbsp;&nbsp;{{ otherUserInfo.user_name }}</p>
          <p>学号&nbsp;&nbsp;{{ otherUserInfo.sid }}</p>
          <p v-if="otherUserInfo.phone">手机&nbsp;&nbsp;{{ otherUserInfo.phone }}</p>
          <p v-if="otherUserInfo.e_mail">邮箱&nbsp;&nbsp;{{ otherUserInfo.e_mail }}</p>
        </div>
      </div>
    </div>
    <div class="options-content">
      <router-link :to="{path: `/user/post/found`}" tag="div" class="options">
        <h3>Ta发布的失物招领</h3>
        <span><i class="mui-icon mui-icon-forward"></i></span>
      </router-link>
      <router-link :to="{path: `/user/post/lost`}" tag="div" class="options">
        <h3>Ta发布的寻物启事</h3>
        <span><i class="mui-icon mui-icon-forward"></i></span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import {Dialog, Toast} from 'vant';

  export default {
    name: "User",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['otherUserInfo'])
    },
    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .user{
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
  }
</style>
