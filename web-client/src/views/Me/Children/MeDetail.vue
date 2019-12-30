<template>
  <div class="medetail">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="goBack"
    />
    <div class="me-photo">
      <img :src="userInfo.avatar" v-if="userInfo.avatar">
      <img src="@/images/user.jpg" v-else>
      <van-uploader :after-read="finalPhotoUpdae">
        <van-button type="info" size="small" class="phone-update">修改头像</van-button>
      </van-uploader>
    </div>
    <div class="options-content">
      <div class="options">
        <van-field 
          v-model="user_name" 
          label="用户名"
          clearable 
          :placeholder="userInfo.user_name" 
        />
      </div>
      <div class="options">
        <van-field 
          v-model="e_mail" 
          label="邮箱"
          clearable 
          :placeholder="userInfo.e_mail" 
        />
      </div>
      <div class="options">
        <van-field 
          v-model="phone" 
          label="手机号"
          type="tel"
          maxlength="11"
          clearable 
          :placeholder="userInfo.phone" 
        />
      </div>
    </div>
    <div class="post-btn"><van-button type="info" size="large" @click="editUserInfo">修改资料</van-button></div>
  </div>
</template>

<script>
  import {editUserInfo, editAvatar, getUserInfo} from '@/service/api/index';
  import {Dialog, Toast} from 'vant';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "MeDetail",
    data() {
      return {
        user_name: '',
        e_mail: '',
        picture_b64: '',  // 图片base64编码
        file: [],   // 上传的图片
        phone: ''
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['synUserInfo']), // 同步本地存储的用户信息
      goBack() {
        this.$router.go(-1);
      },
      async finalPhotoUpdae(file){
        this.file = file.file;
        this.picture_b64 = file.content;
        let formData = new FormData();
        formData.append('avatar', this.file);
        const photoResult = await editAvatar(formData);
        if(photoResult.status === 200){
          Toast.success('修改成功!');
          this.synUserInfo({
            userInfo: photoResult.result.data
          })
        }else{
          Toast.fail('修改失败!');
        }
      },
      async editUserInfo(){
        const result  = await editUserInfo(this.user_name, this.e_mail, this.phone);
        if(result.status === 200){
          Toast.success('修改成功!');
          this.e_mail = '';
          this.phone = '';
          this.user_name = '';
          this.synUserInfo({
            userInfo: result.result.data
          });
          this.$router.replace('/me');
        }else{
          Toast.fail(result.result.message || '修改失败');
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
    .van-nav-bar {
       z-index: 99;
       background: #f5f5f5;
       border-bottom: 1px solid #D4D4D4;
    }
    .me-photo{
      height: 20rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 9rem;
        height: 9rem;
        border-radius: 50%;
        border: 1px solid #dedede;
      }
      .phone-update{
        margin-top: 1.5rem;
        width: 8rem;
        height: 3.2rem;
        border-radius: 5px;
        background: #169BD5;
        border: none;
        color: #fff;
      }
    }
    .options-content{
      margin-top: 1.5rem;
      padding: 0 3rem;
      .options{
        margin: 1rem 0;
        padding: 0 1rem;
        height: 4rem;
        font-size: 14px;
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
      margin: 3rem 1.5rem ;
      .van-button{
        width: 31rem;
        height: 4.6rem;
        border: 5px;
        background: #169BD5;
      }
    }
  }
</style>
