<template>
  <div class="change-email">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="更换邮箱">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="options-content">
      <yd-cell-item>
        <span slot="left"></span>
        <yd-input slot="right" required :debug="true" regex="email" placeholder="请输入邮箱" v-model="email" ref="emailInput"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left"></span>
        <yd-input slot="right" placeholder="请输入邮箱验证码" v-model="code"></yd-input>
        <yd-sendcode
          slot="right"
          @click.native="sendCode"
          v-model="start"
          type="warning"
          init-str="获取验证码"
          second="60"
          run-str="{%s}秒后重新获取"
        ></yd-sendcode>
      </yd-cell-item>
    </div>
    <div class="post-btn"><mt-button type="danger" size="large" @click="editEmail">确认更换</mt-button></div>
  </div>
</template>

<script>
  import {getEditEmailCode, emailChange} from './../../../../api/index';
  import { MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "ChangeEmail",
    data() {
      return {
        email: '',
        code: null,
        start: false,  // 控制获取验证码的倒计时
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['syncUserInfo']), // 同步本地存储的用户信息
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      async sendCode() {
        if(this.$refs.emailInput.valid){
          // 邮箱格式正确
          this.$dialog.loading.open('发送中...');
          const result = await getEditEmailCode(this.email);
          console.log(result);
          this.start = true;
          this.$dialog.loading.close();
          if(result.error_code === 0){
            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1000
            });
          }else if(result.error_code === 2001){
            this.$dialog.toast({
              mes: result.error_msg,
              icon: 'error',
              timeout: 1000
            });
            this.start = false;
          }
        }else{
          // 邮箱格式错误
          this.$dialog.toast({
            mes: '邮箱' + this.$refs.emailInput.errorMsg,
            icon: 'error',
            timeout: 1000
          });
        }
      },
      async editEmail(){
        if(this.$refs.emailInput.valid && this.code){
          this.code = Number(this.code);
          const result = await emailChange(this.email, this.code);
          if(result.error_code === 0){
            this.$dialog.toast({
              mes: '修改成功!',
              icon: 'success',
              timeout: 1000
            });
            this.userInfo.email = this.email;
            this.syncUserInfo(this.userInfo);
            setTimeout(()=>{
              this.$router.replace('/me');
            }, 1000);
            this.start = false;
            this.email = '';
            this.code = null;
          }else{
            this.$dialog.toast({
              mes: result.error_msg,
              icon: 'error',
              timeout: 1000
            });
          }
        }else{
          this.$dialog.toast({
            mes: '请确认输入框内容是否规范',
            icon: 'error',
            timeout: 1000
          });
        }
      },
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .change-email{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    .mint-header {
      z-index: 99;
       background: #f5f5f5;
       height: 40px;
       color: #000;
       font-weight: bolder;
       font-size: 18px;
       border-bottom: 1px solid #D4D4D4;
    }
    .options-content{
      padding-top: 40%;
      .yd-cell-item{
        width: 80%;
        margin: 0 auto 10px;
        border: 1px solid rgba(2, 167, 240, 0.505882352941176);
        border-radius: 10px;
        background: #fff;
      }
    }
    .post-btn{
      text-align: center;
      padding: 50px 35px;
      width: 100%;
    }
  }
</style>
