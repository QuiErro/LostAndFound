<template>
  <div class="goods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_lost_goods.name">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-img" v-if="selected_lost_goods.picture_b64">
        <yd-lightbox>
          <yd-lightbox-img :src="selected_lost_goods.picture_b64"></yd-lightbox-img>
        </yd-lightbox>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{selected_lost_goods.name}}</span></div>
        <div v-if="selected_lost_goods.student_id"><h4>学号:</h4><span>{{selected_lost_goods.student_id}}</span></div>
        <div>
          <h4>丢失地点:</h4>
          <span>{{`(${selected_lost_goods.longitude} , ${selected_lost_goods.latitude})`}}</span>
          <mt-button size="small" type="default" class="xs-button" @click="goMap(selected_lost_goods.longitude, selected_lost_goods.latitude)">查看地图</mt-button>
        </div>
        <div><h4>详细地点:</h4><span>{{selected_lost_goods.place}}</span></div>
        <div><h4>丢失时间:</h4><span>{{selected_lost_goods.time}}</span></div>
        <div><h4>交接方式:</h4><span>{{selected_lost_goods.contact_way}}</span></div>
      </div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>{{selected_lost_goods.info}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{selected_lost_goods.create_time}}</span></div>
      <div class="post-btn" v-if="!selected_lost_goods.found"><mt-button type="danger" size="small" @click="close_post(selected_lost_goods.item_id)">关闭</mt-button></div>
      <div class="post-btn" v-else><mt-button type="danger" size="small" disabled>已关闭</mt-button></div>
    </div>
  </div>
</template>

<script>
  import {finishLost} from './../../../../api/index';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import { MessageBox } from 'mint-ui';

  export default {
    name: "MyPostLostGoods",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['selected_lost_goods', 'userInfo']),
    },
    mounted(){
    },
    methods: {
      ...mapActions(['synLngLat', 'reqUserLostPost', 'reqLost',]),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      close_post(item_id){
        MessageBox.confirm('您确定关闭本条信息吗?').then(action => {
          if('confirm' === action){
            this.editState(item_id);
          }
        });
      },
      async editState(item_id){
        const result = await finishLost(item_id);
        if(result.error_code === 0){
          this.$dialog.toast({
            mes: '关闭成功',
            icon: 'success',
            timeout: 1000
          });
          this.reqUserLostPost(this.userInfo.user_id);
          this.reqLost();
        }else{
          this.$dialog.toast({
            mes: result.error_msg,
            icon: 'error',
            timeout: 1000
          });
        }
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
  .goods{
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
      padding: 60px 10px 0;
      .post-img{
        height: 45%;
        margin-bottom: 20px;
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
        margin: 10px 0;
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
          color: #fff;
          width: 120px;
        }
      }
    }
  }
</style>
