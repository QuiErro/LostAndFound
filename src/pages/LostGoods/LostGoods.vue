<template>
  <div class="lostgoods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_goods.name">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-user" @click="goUser(selected_goods.creator, selected_goods.creator_name)">
        <img src="./image/user.jpg">
        <span>{{selected_goods.creator_name}}</span>
      </div>
      <div class="post-img" v-if="selected_goods.picture_b64">
        <yd-lightbox>
          <yd-lightbox-img :src="selected_goods.picture_b64"></yd-lightbox-img>
        </yd-lightbox>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{selected_goods.name}}</span></div>
		    <div v-if="selected_goods.student_id"><h4>学号:</h4><span>{{selected_goods.student_id}}</span></div>
        <div>
          <h4>丢失地点:</h4>
          <span>{{`(${selected_goods.longitude} , ${selected_goods.latitude})`}}</span>
          <mt-button size="small" type="default" class="xs-button" @click="goMap(selected_goods.longitude, selected_goods.latitude)">查看地图</mt-button>
        </div>
        <div><h4>详细地点:</h4><span>{{selected_goods.place}}</span></div>
        <div><h4>丢失时间:</h4><span>{{selected_goods.time}}</span></div>
        <div><h4>交接方式:</h4><span>{{selected_goods.contact_way}}</span></div>
      </div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>{{selected_goods.info}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{selected_goods.create_time}}</span></div>
      <div class="post-btn"><mt-button type="primary" size="small" v-if="userInfo.username !== selected_goods.creator_name">联系发布人</mt-button></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "LostGoods",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['selected_goods','userInfo']),
    },
    methods: {
      ...mapActions(['synLngLat','reqOtherUserLostPost', 'reqOtherUserFoundPost', 'synSeletedUserName']), // 同步本地存储的用户选择的经纬度
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      goUser(userid,username){
        if(this.userInfo.user_id === userid){
          this.$router.push('/me');
          return;
        }
        this.reqOtherUserLostPost(userid);
        this.reqOtherUserFoundPost(userid);
        this.synSeletedUserName(username);
        this.$router.push('/user/' + userid);
      },
      goMap(lng, lat){
        this.synLngLat({
          lat: lat,
          lng: lng
        });
        this.$router.push('/viewmap');
      }
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .lostgoods{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    font-size: 14px;
    .mint-header {
       z-index: 99;
       background: #f5f5f5;
       height: 40px;
       color: #000;
       font-weight: bolder;
       font-size: 18px;
       border-bottom: 1px solid #D4D4D4;
    }
    .goods-content{
      width: 100%;
      height: 100%;
      padding: 40px 10px 0;
      .post-user{
        height: 8%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .post-img{
        margin-top: 5px;
        height: 45%;
        div{
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            -webkit-transform: scale(1.03);
            -moz-transform: scale(1.03);
            -ms-transform: scale(1.03);
            -o-transform: scale(1.03);
            transform: scale(1.03);
          }
        }
      }
      .post-basic{
        margin: 20px 0;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 3px 3px #D4D4D4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div{
          display: flex;
          flex-direction: row;
          font-size: 12px;
          margin-left: 8px;
          h4{
            font-weight: bolder;
            margin-right: 10px;
            font-size: 12px;
          }
          .mint-button.xs-button{
            background: #D4D4D4;
            height: 25px;
            margin-left: 20px;
            color: #333;
            .mint-button-text{
              font-size: 3px;
            }
          }
        }
      }
      .post-detail{
        padding: 10px;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 3px 3px #D4D4D4;
        display: flex;
        flex-direction: column;
        h4{
          flex: 2;
          font-size: 14px;
        }
        div{
          flex: 10;
          font-size: 13px;
        }
      }
      .post-time{
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        font-weight: bolder;
        color: #aaaaaa;
      }
      .post-btn{
        text-align: center;
        margin: 10px 0 ;
        .mint-button{
          border-radius: 5px;
          color: #333;
          background: rgba(2, 167, 240, 0.505882352941176);
          width: 120px;
        }
      }
    }
  }
</style>
