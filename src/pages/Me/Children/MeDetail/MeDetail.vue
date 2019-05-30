<template>
  <div class="medetail">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="编辑资料">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="me-photo">
      <img src="./../../image/user.jpg">
    </div>
    <div class="options-content">
      <div class="options">
        <span>用户名</span>
        <span><input type="text" v-model="username"></span>
      </div>
      <div class="options">
        <span>绑定学号</span>
        <span><input type="text" v-model="student_id"></span>
      </div>
     <!-- <div class="options">
        <span>手机</span>
        <span><input type="text" :placeholder="userInfo.phone || '未开放' " disabled></span>
      </div> -->
    </div>
    <div class="post-btn"><mt-button type="danger" size="small" @click="editUserInfo">修改资料</mt-button></div>
  </div>
</template>

<script>
  import {userEdit} from './../../../../api/index';
  import { MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "MeDetail",
    data() {
      return {
        username: '',
        student_id: ''
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
      this.username = this.userInfo.username;
      this.student_id = this.userInfo.student_id || '未绑定';
    },
    watch:{
      userInfo(){
        this.username = this.userInfo.username;
        this.student_id = this.userInfo.student_id || '未绑定';
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']), // 同步本地存储的用户信息
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      async editUserInfo(){
        const result  = await userEdit(this.username, this.student_id);
        if(result.error_code === 0){
          this.$dialog.toast({
            mes: '修改成功',
            icon: 'success',
            timeout: 1000
          });
          this.syncUserInfo(result.data);
          this.$router.replace('/me');
        }else{
          this.$dialog.toast({
            mes: result.error_msg,
            icon: 'error',
            timeout: 1000
          });
        }
      }
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
        width: 87px;
        height: 87px;
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
