<template>
  <div class="login-container">
    <div class="back-icon"><span @click="goBack"><i class="mui-icon mui-icon-back"></i></span></div>
    <div class="login-title">欢迎使用XX</div>
    <!--面板标题-->
    <div class="login-header">
      <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">学号登录</a>
      <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">邮箱登录</a>
    </div>
    <yd-cell-item v-if="loginMode">
      <span slot="left"></span>
      <yd-input slot="right" required placeholder="请输入学号" type="number" v-model="student_id"></yd-input>
    </yd-cell-item>
    <yd-cell-item v-else>
      <span slot="left"></span>
      <yd-input slot="right" required :debug="true" regex="email" placeholder="请输入邮箱" v-model="email" ref="emailInput"></yd-input>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left"></span>
      <yd-input slot="right" type="password" placeholder="请输入密码" v-model="password"></yd-input>
    </yd-cell-item>
    <div class="post-btn"><mt-button type="primary" size="large" @click="login">登录</mt-button></div>
    <div class="goregister" @click="goReg">立即注册</div>
  </div>
</template>

<script>
  import {pwdLogin} from './../../api/index';
  import {mapActions} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        loginMode: true, // 登录方式, true 学号登录  false 邮箱登录
        type: 1, // post登录方式  1 学号  0 邮箱
        email: '',  // 邮箱
        password: '', // 密码
        student_id: '', // 学号
        userInfo: {}, // 用户信息
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']), // 同步本地存储的用户信息
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      async login(){
        if(this.type === 0 && !this.$refs.emailInput.valid){
          // 邮箱格式错误
          this.$dialog.toast({
            mes: '邮箱' + this.$refs.emailInput.errorMsg,
            icon: 'error',
            timeout: 1000
          });
        }else if(this.type === 1 && !this.student_id){
          this.$dialog.toast({
            mes: '学号不得为空',
            icon: 'none',
            timeout: 1000
          });
        }else if(!this.password){
          this.$dialog.toast({
            mes: '密码不得为空',
            icon: 'none',
            timeout: 1000
          });
        }else{
          if(this.type){
            // 学号登录
            const result = await pwdLogin({
              type: this.type,
              student_id: this.student_id,
              password: this.password
            });
            if(result.error_code === 0){
              this.userInfo = result.data;
            }else{
              this.$dialog.toast({
                mes: result.error_msg,
                icon: 'error',
                timeout: 1000
              });
            }
          }else{
            // 邮箱登录
            const result = await pwdLogin({
              type: this.type,
              email: this.email,
              password: this.password
            });
            if(result.error_code === 0){
              this.userInfo = result.data;
            }else{
              this.$dialog.toast({
                mes: result.error_msg,
                icon: 'error',
                timeout: 1000
              });
            }
          }
          if(this.userInfo.user_id){
            this.$dialog.toast({
              mes: '登录成功',
              icon: 'success',
              timeout: 1000
            });
             // 同步本地用户数据
            this.syncUserInfo(this.userInfo);
            this.$router.replace('/home');
            this.email = '';
            this.code = null;
            this.student_id = '';
            this.password = '';
          }
        }
      },
      goReg(){
        this.$router.replace('/register');
      },
      dealLoginMode(flag) {
        this.loginMode = flag;
        this.type = flag ? 1 : 0;
      },
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .login-container{
    background: #fff;
    width: 100%;
    height: 100%;
    .back-icon{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      font-size: 20px;
      color: #333;
    }
    .login-title{
      width: 100%;
      height: 20%;
      padding: 30px 30px 0;
      font-size: 24px;
      font-style: oblique;
    }
    .login-header{
      padding-bottom: 20px;
      text-align: center;
      a{
        color: #333;
        font-size: 14px;
        padding-bottom: 4px;
      }
      a:first-child{
        margin-right: 40px;
      }
      a.current{
        color: #169BD5;
        font-weight: 700;
        border-bottom: 2px solid #169BD5;;
      }
    }
    .yd-cell-item{
      width: 80%;
      margin: 0 auto 20px;
      border: 1px solid rgba(2, 167, 240, 0.505882352941176);
      border-radius: 10px;
    }
    .post-btn{
      text-align: center;
      padding: 20px 35px;
      width: 100%;
    }
    .goregister{
      padding: 25px 20px;
      font-size: 14px;
      color: #aaa;
    }
  }
</style>
