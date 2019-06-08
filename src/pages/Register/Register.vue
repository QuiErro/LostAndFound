<template>
  <div class="register-container">
    <div class="back-icon"><span @click="goBack"><i class="mui-icon mui-icon-back"></i></span></div>
    <yd-cell-item>
      <span slot="left"></span>
      <yd-input  slot="right" required :debug="true" regex="email" placeholder="请输入邮箱" v-model="email" ref="emailInput"></yd-input>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left"></span>
      <yd-input slot="right" placeholder="请输入邮箱验证码" v-model="code"></yd-input>
      <yd-sendcode slot="right"
        @click.native="sendCode"
        v-model="start"
        type="warning"
        init-str="获取验证码"
        second="60"
        run-str="{%s}秒后重新获取"
      >
      </yd-sendcode>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left"></span>
      <yd-input slot="right" placeholder="请输入学号" v-model="student_id"></yd-input>
    </yd-cell-item>
    <yd-cell-item>
      <span slot="left"></span>
      <yd-input slot="right" type="password" placeholder="请输入密码" v-model="password"></yd-input>
    </yd-cell-item>
    <div class="post-btn"><mt-button type="primary" size="large" @click="register">注册</mt-button></div>
    <div class="gologin" @click="goLogin">立即登录</div>
  </div>
</template>

<script>
  import {getEmailCode, emailCodeRegister} from './../../api/index';

  export default {
    name: "Register",
    data() {
      return {
        start: false,  // 控制获取验证码的倒计时
        type: 0, // 方式：邮箱注册
        email: '',  // 注册邮箱
        code: null,  // 邮箱验证码
        student_id: '',  // 学号
        password: '',  // 密码
      }
    },
    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      goLogin(){
        this.$router.replace('/login');
      },
      async register(){
        if(this.$refs.emailInput.valid && this.code && this.password){
          this.code = Number(this.code);
          const result = await emailCodeRegister(this.type, this.email, this.code, this.student_id, this.password);
          if(result.error_code === 0){
            this.$dialog.toast({
              mes: '注册成功!请登录',
              icon: 'success',
              timeout: 1000
            });
            setTimeout(()=>{
              this.$router.replace('/login');
            }, 1000);
            this.start = false;
            this.email = '';
            this.code = null;
            this.student_id = '';
            this.password = '';
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
            icon: 'none',
            timeout: 1000
          });
        }
      },
      async sendCode() {
        if(this.$refs.emailInput.valid){
          // 邮箱格式正确
          this.$dialog.loading.open('发送中...');
          const result = await getEmailCode(this.email);
          console.log(result);
          this.start = true;
          this.$dialog.loading.close();
         // console.log(result);
          if(result.error_code === 0){
            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1000
            });
          }else if(result.error_code === 2001){
            this.$dialog.toast({
              mes: result.error_msg,
              icon: 'none',
              timeout: 1000
            });
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
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .register-container{
    background: #fff;
    width: 100%;
    height: auto;
    min-height: 100%;
    .back-icon{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      font-size: 20px;
      color: #333;
      margin-bottom: 30px;
    }
    .yd-cell-item{
      width: 80%;
      margin: 0 auto 10px;
      border: 1px solid rgba(2, 167, 240, 0.505882352941176);
      border-radius: 10px;
    }
    .post-btn{
      text-align: center;
      padding: 25px 35px;
      width: 100%;
    }
    .gologin{
      padding: 25px 20px;
      font-size: 14px;
      color: #aaa;
    }
  }
</style>
