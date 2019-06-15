<template>
  <div id="prop-list">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_month + '月未认领的卡'">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
      <div class="goods-list"  v-if="student_cards.length">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(obj, index) in student_cards" :key="index">
            <a @click="goGoodsDetail(obj)">
              <img class="mui-media-object mui-pull-left" :src="'http://47.112.10.160:3389/image/' + obj.picture[0]" v-if="obj.picture">
              <div class="mui-media-body">
                <h1>{{obj.name}}{{obj.student_id || ''}}</h1>
                <p class='mui-ellipsis'>
                  <span>拾到时间：{{obj.time}}</span>
                  <span>拾到地点：{{obj.place}}</span>
                  <span class="post-time">{{obj.create_time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="showIftips" v-else>暂时没有物品</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "StudentCards",
    data(){
      return{
      }
    },
    computed:{
      ...mapState(['student_cards', 'selected_month']),
    },
    methods:{
      ...mapActions(["synSeletedGoods"]),
      goGoodsDetail(obj){
        this.$router.push('/foundgoods/'+obj.item_id);
        this.synSeletedGoods(obj);
      },
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
#prop-list{
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  display: flex;
  flex-direction: column;
  .mint-header {
    z-index: 99;
    background: #f5f5f5;
    height: 40px;
    color: #000;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #D4D4D4;
  }
  .goods-list{
    padding: 50px 10px 10px;
    .mui-table-view:before{
      background: #ffffff !important;
    }
    .mui-table-view:after{
      background: #f5f5f5 !important;
    }
    .mui-table-view {
      background: #F5F5F5;
      .mui-table-view-cell:after{
        background: #f5f5f5;
      }
      li {
        margin: 0 5px 10px;
        background: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 10px;
        box-shadow: 1px 1px 4px #dfdfdf;
        a{
          display: flex;
          flex-direction: row;
          .mui-media-object.mui-pull-left{
            max-width: 90px !important;
            width: 90px;
            height: 90px;
            max-height: 90px !important;
            margin-right: 20px;
          }
          .mui-media-body{
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: flex-between;
            h1 {
              padding-left: 5px;
              font-size: 16px;
              margin-bottom: 4px;
            }
            .mui-ellipsis {
              font-size: 13px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              padding-left: 5px;
              width: 100%;
              .post-time{
                text-align: right;
                font-size: 12px;
                color: rgba(143, 143, 148, 0.6);
              }
            }
          }
        }
      }
    }
  }
  .showIftips{
    color: #333;
    width: 100%;
    text-align: center;
    padding-top: 40%;

  }
}
</style>
