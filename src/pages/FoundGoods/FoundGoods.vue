<template>
  <div class="foundgoods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_goods.name">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-user" @click="goUser">
        <img src="./image/small-loading.svg">
        <span>用户名</span>
      </div>
      <div class="post-img" v-if="selected_goods.picture">
        <yd-lightbox>
          <yd-lightbox-img :src="'http://47.112.10.160:3389/image/'+selected_goods.picture"></yd-lightbox-img>
        </yd-lightbox>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{selected_goods.name}}</span></div>
        <div>
          <h4>拾到地点:</h4>
          <span>{{`(${selected_goods.pick_longitude} , ${selected_goods.pick_latitude})`}}</span>
          <mt-button size="small" type="default" class="xs-button" @click="goMap(selected_goods.pick_longitude, selected_goods.pick_latitude)">查看地图</mt-button>
        </div>
        <div><h4>详细地点:</h4><span>{{selected_goods.pick_place}}</span></div>
        <div><h4>拾到方式:</h4><span>{{selected_goods.pick_time}}</span></div>
        <div><h4>交接方式:</h4><span>{{selected_goods.contact_way}}</span></div>
      </div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>{{selected_goods.info}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{selected_goods.create_time}}</span></div>
      <div class="post-btn"><mt-button type="primary" size="small">联系发布人</mt-button></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "FoundGoods",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['selected_goods']),
    },
    methods: {
      ...mapActions(['synLngLat']), // 同步本地存储的用户选择的经纬度
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      goUser(){
        this.$router.push('/user');
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
  .foundgoods{
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
        height: 50%;
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
            height: 25px;
            background: #D4D4D4;
            color: #333;
            margin-left: 20px;
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
