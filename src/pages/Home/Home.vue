<template>
  <div id="home">
    <div class="headerTop">
      <span class="userInfo" @click="goMeOrLogin">
        <img :src="'http://47.112.10.160:3389/image/' + userInfo.photo" v-if="userInfo.photo">
        <img src="./image/user.jpg" v-else>
      </span>
      <div class="searchInput">
        <router-link to="/search" class="search-nav-icon">
          <span><i class="mui-icon mui-icon-search"></i></span>
          <span>搜索您需要寻找的物品</span>
        </router-link>
      </div>
    </div>
    <div class="headerBottom">
      <yd-tab
       active-color="#02A7F0"
       bg-color="#F5F5F5"
       :callback="fn">
        <yd-tab-panel label="失物信息" ></yd-tab-panel>
        <yd-tab-panel label="寻物信息"></yd-tab-panel>
      </yd-tab>
      <select class="mui-btn mui-btn-block" ref="prop_type" @change="selectPropType">
        <option value="all">全部</option>
        <option value="card">校园卡</option>
        <option value="common">普通物品</option>
        <option value="value">贵重物品</option>
      </select>
    </div>

    <router-view></router-view>

    <div class="post-goods" @click="goPostOrLogin">
      <span><i class="mui-icon mui-icon-paperplane"></i></span>
      <span>发布</span>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {mapState} from 'vuex';

  export default {
    name: "Home",
    data(){
      return{
        // 事件类型
        event_type: 'found',  // 失物 寻物
        show_type: 'all', // 显示的分类
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    created(){
      this.reqFound();
      this.reqLost();
    },
    watch: {
      userInfo(){
        this.reqUserLostPost(this.userInfo.user_id);
        this.reqUserFoundPost(this.userInfo.user_id);
      }
    },
    methods: {
      ...mapActions(['reqFound', 'reqLost','reqUserLostPost', 'reqUserFoundPost']),
      // 修改物品类型
      selectPropType() {
        this.show_type = this.$refs.prop_type.value;
        this.$router.replace('/home/' + this.event_type + '/' + this.show_type);
      },
      // 选项卡切换控制事件类型
      fn(label, key) {
        if(label === "失物信息"){
          this.event_type = 'found';
        }else{
          this.event_type = 'lost';
        }

        this.$router.replace('/home/' + this.event_type + '/' + this.show_type);
      },
      goMeOrLogin(){
        if(this.userInfo.user_id){
          this.$router.push('/me');
        }else{
          this.$router.push('/login');
        }
      },
      goPostOrLogin(){
        if(this.userInfo.user_id){
          this.$router.push('/post');
        }else{
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  #home{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    position: relative;
    .headerTop{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      height: 50px;
      width: 100%;
      padding-left: 10px;
      .userInfo{
        width: 12%;
        text-align: center;
        margin-right: 10px;
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-size: cover;
        }
      }
      .searchInput{
        width: 75%;
        .search-nav-icon{
          background-color: #e8e8e8;
          border-radius: 10px;

          display: flex;
          justify-content: center;
          align-items: center;
          span{
            color: #aaa;
            margin-left: 6px;
            font-size: 13px;
            font-weight: lighter;
          }
        }
      }
      .messageBox{
        width: 13%;
        text-align: center;
      }
    }
    .headerBottom{
      padding: 5px;
      border-bottom: 1px solid #D4D4D4;
      position: relative;

      display: flex;
      flex-direction: row;
      align-items: center;

      .yd-tab{
        width: 63%;
        margin-left: 12%;
      }
      .mint-button{
        font-size: 12px;
        margin: 0px 5px;
        background: #fff;
        border-radius: 7px;
      }
      .mui-btn-block{
        width: 20%;
        height: 30px;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #e2e2e2;
        position: relative;
        padding: 0;
        line-height: 30px;
        font-size: 12px;
        position: absolute;
        right: 10px;
        text-align: center;
        text-align-last: center;
      }
    }
    .post-goods{
      position: fixed;
      right: 15px;
      bottom: 40px;
      width: 65px;
      height: 65px;
      border: 1px solid #169BD5;
      border-radius: 50%;
      background: #169BD5;
      opacity: 0.7;
      font-size: 14px;
      color: white;
      z-index: 999;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      i{
        font-size: 40px;
      }
      span{
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
</style>
