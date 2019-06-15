<template>
  <div class="search">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="搜索">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <!--搜索面板-->
    <div class="search-panel">
      <div class="search-nav">
        <div class="search-input">
          <img src="./images/search.png" alt="" width="25"/>
          <input ref="mySearch" type="search" v-model="search_name"/>
        </div>
        <mt-button type="default" size="small" @click="search">搜索</mt-button>
      </div>
      <div class="post-cell-item">
        <mt-button size="small" :type="event_type ? 'default' : 'primary' " @click="choiceType(0)">失物招领</mt-button>
        <mt-button size="small" :type="event_type ? 'primary' : 'default' " @click="choiceType(1)">寻物启事</mt-button>
        <select class="mui-btn mui-btn-block" ref="prop_type" @change="selectPropType">
          <option value=0>校园卡</option>
          <option value=1>普通物品</option>
          <option value=2>贵重物品</option>
        </select>
      </div>
      <div class="search-content">
        <div class="goods-list">
          <ul class="mui-table-view" v-if="searchContent.length">
            <li class="mui-table-view-cell mui-media" v-for="(obj, index) in searchContent" :key="index">
              <a @click="goGoodsDetail(obj)">
                <img class="mui-media-object mui-pull-left" :src="'http://47.112.10.160:3389/image/' + obj.picture[0]" v-if="obj.picture">
                <div class="mui-media-body">
                  <h1>{{obj.name}}</h1>
                  <p class='mui-ellipsis'>
                    <span>{{obj.event_type ? '丢失' : '拾到'}}时间：{{obj.time}}</span>
                    <span>{{obj.event_type ? '丢失' : '拾到'}}地点：{{obj.place}}</span>
                    <span class="post-time">{{obj.create_time}}</span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
          <div v-else>没有找到您想要的物品</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "Search",
    data() {
      return {
        search_name: '', // 搜索框的内容
        event_type: 0,  // 事件类型   0--失物  1--寻物
        show_type: 0, // 显示的分类
      }
    },
    mounted(){
      this.$refs.mySearch.focus()
    },
    computed: {
      ...mapState(['searchContent']),
    },
    methods: {
      ...mapActions(['reqSearchFoundPost','reqSearchLostPost', 'synSeletedGoods']),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      // 选择事件类型
      choiceType(flag){
        this.event_type = flag;
      },
      // 修改物品类型
      selectPropType(props) {
        this.show_type = this.$refs.prop_type.value;
      },
      goGoodsDetail(obj){
        if(!obj.event_type){
          this.$router.push('/foundgoods/'+obj.item_id);
        }else{
          this.$router.push('/lostgoods/'+obj.item_id);
        }
        this.synSeletedGoods(obj);
      },
      search(){
        this.isShow = false;
        if(!this.search_name){
          this.$dialog.toast({
            mes: '搜索框的内容不得为空',
            timeout: 1000
          });
          return;
        }
        if(!this.event_type){
          this.reqSearchFoundPost({
            name: this.search_name,
            type: this.show_type
          });
        }else{
          this.reqSearchLostPost({
            name: this.search_name,
            type: this.show_type
          });
        }
      }
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .search{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    .search-panel{
      width: 100%;
      height: 100%;
      margin-top: 40px;
      background-color: #fff;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      .post-cell-item{
        padding: 10px 10px 10px 20px;
        position: relative;
        display: flex;
        justify-content: flex-start;
        .mint-button{
          margin-right: 20px;
          border-radius: 7px;
          height: 28px;
          font-size: 12px;
          background: #f5f5f5;
          border: 1px solid #d4d4d4;
        }
        .mint-button--primary{
          background: #169BD5;
          color: #fff;
          border: 1px solid #169BD5;
        }
        .mui-btn-block{
          width: 20%;
          height: 30px;
          border-radius: 5px;
          background: #169BD5;
          color: #fff;
          position: relative;
          padding: 0;
          line-height: 30px;
          font-size: 12px;
          position: absolute;
          right: 30px;
          text-align: center;
          text-align-last: center;
          option{
            background: #fff;
            color: #000;
          }
        }
      }
      .search-nav{
        width: 100%;
        height: 60px;
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .search-input{
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 85%;
          height: 38px;
          border-radius: 5px;
          background-color: #ededed;
          padding: 0 10px;
          input{
            background-color: #ededed;
            width: 90%;
            height: 90%;
            padding-left: 10px;
            color: #aaa;
            font-size:6px;
            outline: none;
            margin-bottom: 0;
            padding: 5px 15px;
            font-size: 14px;
          }
        }
        .mint-button{
          margin-left: 5px;
          background-color: #f8f8f8;
          font-size: 16px;
          color: #aaa;
          border: 1px solid #dddddd;
        }
      }
    }
    .search-content{
      padding: 30px 15px;
      .goods-list{
        padding: 15px 10px;
        .mui-table-view:before{
          background: #ffffff !important;
        }
        .mui-table-view:after{
          background: #ffffff !important;
        }
        .mui-table-view {
          background: #ffffff;
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
    }
  }
</style>
