<template>
  <div class="login-container">
    <div class="back-icon">
      <van-icon name="arrow-left" @click="goBack"/>
    </div>
    <div class="login-title">欢迎使用失物招领平台</div>
    <van-cell-group>
      <van-field
        readonly
        clickable
        clearable
        placeholder="请输入学号"
        :value="sid"
        @touchstart.native.stop="keyBoardShow = true"
      />
      <div class="login-pwd">
        <van-field
          v-model="user_pwd"
          :type="pwdStyle"
          clearable
          placeholder="请输入密码"
        />
        <van-icon :name="pwdShow" @click="changePwdStyle"/>
      </div>
      <div class="login-captcha">
        <van-field
          v-model="captcha"
          clearable
          placeholder="请输入验证码"
        />
        <img
          ref="captcha"
          class="get-verification"
          src="http://localhost:5000/api/captcha"
          @click.prevent="getCaptcha()"
        >
      </div>
    </van-cell-group>
    <van-number-keyboard
      v-model="sid"
      :show="keyBoardShow"
      :maxlength="9"
      @blur="keyBoardShow = false"
    />
    <div class="login_btn">
      <van-button type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
  import {userLogin} from '../../service/api/index'
  import {mapActions} from 'vuex'
  import {Toast} from 'vant'

  export default {
    name: "Login",
    data() {
      return {
        sid: '',       // 学号 
        user_pwd: '',  // 密码
        captcha: '',   // 验证码
        keyBoardShow: false,   // 数字键盘的显示
        pwdStyle: 'password',  // 密文
        pwdShow: 'closed-eye', // 密文
      }
    },
    methods: {
      ...mapActions(['synUserInfo']), // 登录

      // 1. 点击后退
      goBack() {
        this.$router.go(-1);
      },
      // 2. 切换密码显示方式
      changePwdStyle(){
        this.pwdStyle = this.pwdStyle === 'password' ? 'text' : 'password';
        this.pwdShow = this.pwdShow === 'closed-eye' ? 'eye-o' : 'closed-eye';
      },
      // 3. 获取图形验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:5000/api/captcha?time=' + new Date();
      },
      // 4. 登录
      async login(){
        // 4.1 前端校验
        if(!this.sid){
          Toast.fail('学号不得为空');
          return;
        }
        if(!this.user_pwd){
          Toast.fail('密码不得为空');
          return;
        }
        if(!this.captcha){
          Toast.fail('验证码不得为空');
          return;
        }
        // 4.2 发起请求
        const result = await userLogin(this.sid, this.user_pwd, this.captcha);
        if(result.status === 200){
          // 4.2.1 同步用户信息
          this.synUserInfo({
            userInfo: result.result.data
          })
          this.$router.replace('/');
          Toast.success('登录成功');
        }else{
          Toast.fail(result.result.message);
        }
      },
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .login-container{
    width: 100%;
    height: 100%;
    background: #fff;
    .back-icon{
      padding: 30px 20px;
      font-size: 20px;
      color: #333;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .login-title{
      padding: 30px 30px 0;
      width: 100%;
      height: 20%;
      font-size: 20px;
      font-style: oblique;
    }
    .van-field{
      margin: 0 auto 20px;
      width: 80%;
      border: 1px solid rgb(65, 189, 244);
      border-radius: 1rem;
    }
    .login-pwd{
      position: relative;
      margin: 0 auto;
      width: 80%;
      .van-field{
        padding-right: 15%;
        width: 100%;
      }
      .van-icon{
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
    }
    .login-captcha{
      position: relative;
      margin: 0 auto;
      width: 80%;
      .van-field{
        padding-right: 40%;
        width: 100%;
      }
      img{
        position: absolute;
        right: 0;
        top: 0;
        width: 40%;
        height: 100%;
      }
    }
    .login_btn{
      margin: 50px auto;
      width: 80%;
      text-align: center;
      .van-button{
        background: rgb(65, 189, 244);
        font-size: 1.8rem;
        border-radius: 1rem;
      }
    }
  }
</style>
