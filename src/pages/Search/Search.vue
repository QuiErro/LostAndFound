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
          <input ref="mySearch" type="search" @click="isShow=true"/>
        </div>
        <button>搜索</button>
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
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="index in 2" :key="index">
              <a>
                <img class="mui-media-object mui-pull-left" src="./images/small-loading.svg">
                <div class="mui-media-body">
                  <h1>校园卡03180000</h1>
                  <p class='mui-ellipsis'>
                    <span>拾到时间：2019-05-19</span>
                    <span>拾到地点：西三教学楼</span>
                    <span class="post-time">2019-05-19</span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Search",
    data() {
      return {
        isShow: true,
      }
    },
    mounted(){
      this.$refs.mySearch.focus()
    },
    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      // 是否显示搜索面板
      showSearchPanel(flag){
        this.isShow = flag;
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
          background: #F5F5F5;
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
