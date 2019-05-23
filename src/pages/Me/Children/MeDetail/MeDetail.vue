<template>
  <div class="medetail">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="编辑资料">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="me-photo">
      <img src="./image/small-loading.svg">
    </div>
    <div class="options-content">
      <div class="options">
        <span>用户名</span>
        <span><input type="text" placeholder="xxxxx"></span>
      </div>
      <div class="options">
        <span>邮箱</span>
        <span><input type="text" :placeholder="userInfo.email"></span>
      </div>
      <div class="options">
        <span>手机</span>
        <span><input type="text" :placeholder="userInfo.phone || '未绑定' "></span>
      </div>
      <div class="options">
        <span>绑定学号</span>
        <span><input type="text" :placeholder="userInfo.student_id || '未绑定' "></span>
      </div>
    </div>
    <div class="post-btn"><mt-button type="danger" size="small">修改资料</mt-button></div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';

  export default {
    name: "MeDetail",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['userInfo'])
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
  .medetail{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    .mint-header {
       z-index: 99;
       background: #ffffff;
       height: 40px;
       color: #000;
       font-weight: bolder;
       font-size: 18px;
    }
    .me-photo{
      padding-top: 40px;
      background: #ffffff;
      height: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 25%;
        height: 55%;
        border-radius: 50%;
      }
    }
    .options-content{
      margin-top: 15px;
      .options{
        height: 40px;
        padding: 0 10px;
        margin: 8px 0;
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
          border: none;
          outline: none;
          text-align: right;
          margin-bottom: 0;
        }
      }
    }
    .post-btn{
      text-align: center;
      margin: 30px 0 ;
      .mint-button{
        border-radius: 5px;
        color: #fff;
        width: 120px;
      }
    }
  }
</style>
