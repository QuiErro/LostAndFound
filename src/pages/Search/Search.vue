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
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请选择搜索类型</span></h5>
        <mt-button size="small" :type="event_type ? 'default' : 'primary' " @click="choiceType(0)">失物招领</mt-button>
        <mt-button size="small" :type="event_type ? 'primary' : 'default' " @click="choiceType(1)">寻物启事</mt-button>
        <mt-button type="default" size="small" @click="sheetVisible = true" class="prop-type">{{prop_type}}</mt-button>
      </div>
      <div class="search-nav">
        <div class="search-input">
          <img src="./images/search.png" alt="" width="25"/>
          <input ref="mySearch" type="search" @click="isShow=true" v-model="search_name"/>
        </div>
        <button @click="search">搜索</button>
      </div>
      <div class="search-history" v-if="isShow">
        <div class="title">
          <div>
            <img src="./images/hot.png" alt="" width="25">
            <span>历史搜索</span>
          </div>
          <img src="./images/clear.svg" alt="" width="20" @click="showSearchPanel(false)" class="clear-icon"/>
        </div>
        <ul class="search-list">
          <li>校园卡</li>
          <li>手机</li>
          <li>钥匙</li>
          <li>书包</li>
          <li>手表</li>
          <li>手提电脑</li>
        </ul>
        <mt-button type="default" size="small" @click="showSearchPanel(false)">隐藏历史搜索</mt-button>
      </div>
      <div class="search-content" v-if="!isShow">
        <div class="goods-list">
          <ul class="mui-table-view" v-if="searchContent.length">
            <li class="mui-table-view-cell mui-media" v-for="(obj, index) in searchContent" :key="index">
              <a @click="goGoodsDetail(obj)">
                <img class="mui-media-object mui-pull-left" :src="obj.picture_b64" v-if="obj.picture_b64">
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
     <!--选择物品类型-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "Search",
    data() {
      return {
        isShow: true,
        search_name: '', // 搜索框的内容
        event_type: 0,  // 事件类型   0--失物  1--寻物
         // 物品类型
        sheetVisible: false,
        prop_type: '校园卡',
        show_type: 0, // 显示的分类
        actions: [
          {name: '校园卡', method: this.selectPropType, type: 0},
          {name: '普通物品', method: this.selectPropType, type: 1},
          {name: '贵重物品', method: this.selectPropType, type: 2},
        ],
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
        this.prop_type = props.name;
        this.show_type = props.type;
      },
      // 是否显示搜索面板
      showSearchPanel(flag){
        this.isShow = flag;
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
      .mint-button.prop-type{
        font-size: 12px;
        margin: 0px 5px;
        background: #169BD5 !important;
        border-radius: 7px;
        color: #fff;
        border: 1px solid #169BD5 !important;
      }
      .post-cell-item{
        padding: 10px 20px;
        .mint-button{
          margin-right: 15px;
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
        h5{
          span{
            color: #333;
            font-weight: bolder;
            font-size: 16px;

            i{
              color: #169BD5;
              font-size: 10px;
              display: inline-block;
              margin-right: 2px;
            }
          }
        }
      }
      .search-nav{
        width: 100%;
        height: 60px;
        border-bottom: px solid #dddddd;
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
        }
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
      button{
        background-color: transparent;
        font-size: 16px;
        color: #aaa;
      }
    }
    .search-history{
      padding: 30px 15px;
      .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #aaa;
        margin-bottom: 10px;
        div{
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
      .search-list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li{
          background-color: #ededed;
          color: #aaa;
          margin: 5px 15px;
          padding: 5px 5px;
          border-radius: 10px;
        }
      }
      .mint-button{
        border-radius: 10px;
        color: #333;
        background: rgba(2, 167, 240, 0.505882352941176);
        margin: 20px auto;
      }
    }
    .search-content{
      padding: 30px 15px;
      .goods-list{
        padding: 15px 10px;
        .mui-table-view:before{
          background: #ffffff !important;
        }
        .mui-table-view {
          background: #eeeef0;
          border-radius: 10px;
          padding: 3px 0 0;
          .mui-table-view-cell:after{
            background: #ffffff;
          }
          li {
            margin: 0 5px 10px;
            background: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 10px;
            box-shadow: 2px 2px #cccccc;
            a{
              display: flex;
              flex-direction: row;
              justify-content: center;
              .mui-media-object.mui-pull-left{
                max-width: 45% !important;
                width: 35%;
                height: 30%;;
                margin-right: 20px;
              }
              .mui-media-body{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h1 {
                  font-size: 14px;
                }
                .mui-ellipsis {
                  font-size: 12px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;

                  .post-time{
                    text-align: right;
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
