<template>
  <div class="medetail">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="编辑资料">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="me-photo">
      <img :src="'http://47.112.10.160:3389/image/' + userInfo.photo" v-if="userInfo.photo">
      <img src="./../../image/user.jpg" v-else>
      <input @change="fileChange($event)" type="file" id="upload_file" style="display: none" ref="file"/>
      <mt-button type="primary" size="small" @click="editUserPhoto" class="phone-update">修改头像</mt-button>
    </div>
    <div class="options-content">
      <div class="options">
        <span>用户名</span>
        <span><input type="text" v-model="username"></span>
      </div>
      <div class="options">
        <span>学号</span>
        <span><input type="text" v-model="student_id"></span>
      </div>
     <!-- <div class="options">
        <span>手机</span>
        <span><input type="text" :placeholder="userInfo.phone || '未开放' " disabled></span>
      </div> -->
    </div>
    <div class="post-btn"><mt-button type="primary" size="large" @click="editUserInfo">修改资料</mt-button></div>
  </div>
</template>

<script>
  import {userEdit, photoChange, getUserInfo} from './../../../../api/index';
  import { MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "MeDetail",
    data() {
      return {
        username: '',
        student_id: '',
        picture_b64: '',  // 图片base64编码
        size: 0,
        limit: 1, //限制图片上传的数量
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
      ...mapActions(['syncUserInfo', 'reqFound', 'reqLost',]), // 同步本地存储的用户信息
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      editUserPhoto(){
        document.getElementById('upload_file').click();
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
           }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
         }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
               _this.folders(file[i]);
            }
          }
        });
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
           _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          this.$dialog.toast({mes: '请选择图片文件'});
        } else {
          let reader = new FileReader();
          let _this = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            _this.picture_b64 = file.src;
            _this.finalPhotoUpdae();
          }
        }
      },
      async finalPhotoUpdae(){
        const photoResult = await photoChange({picture_b64: this.picture_b64});
        const userResult = await getUserInfo(this.userInfo.user_id);
        if(photoResult.error_code === 0){
          this.$dialog.toast({
            mes: '修改成功',
            icon: 'success',
            timeout: 1000
          });
          this.reqFound();
          this.reqLost();
        }else{
          this.$dialog.toast({
            mes: '修改失败',
            icon: 'error',
            timeout: 1000
          });
        }
        if(userResult.error_code === 0){
          this.syncUserInfo(userResult.data);
        }
      },
      async editUserInfo(){
        const result  = await userEdit(this.username, this.student_id);
        if(result.error_code === 0){
          this.$dialog.toast({
            mes: '修改成功',
            icon: 'success',
            timeout: 1000
          });
          this.reqFound();
          this.reqLost();
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 87px;
        height: 87px;
        border-radius: 50%;
      }
      .phone-update{
        background: #fff;
        color: #aaa;
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
      margin: 30px 15px ;
      .mint-button{
        border-radius: 5px;
        color: #fff;
      }
    }
  }
</style>
