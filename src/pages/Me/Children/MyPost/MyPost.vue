<template>
  <div class="my-post">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="我的发布">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="user-post-list">
      <h3>我的发布</h3>
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottomDistance="30" bottomPullText="上拉加载更多">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="index in 3" :key="index">
            <router-link to="/mypostgoods">
              <img class="mui-media-object mui-pull-left" src="./image/small-loading.svg">
              <div class="mui-media-body">
                <h1>校园卡03180000</h1>
                <p class='mui-ellipsis'>
                  <span>丢失时间：2019-05-19</span>
                  <span>丢失地点：西三教学楼</span>
                  <span class="post-time">2019-05-19</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Me",
    data() {
      return {
      }
    },
    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      loadBottom() {
        this.isShowTips = false;
        // 加载更多数据
        setTimeout(()=>{
          this.allLoaded = true;// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        },500);
      },
    }
  }
</script>
<style scoped lang="less" ref="stylesheet/less">
  .my-post{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    .mint-header {
       z-index: 99;
       background: #f5f5f5;
       height: 40px;
       color: #000;
       font-weight: bolder;
       font-size: 18px;
       border-bottom: 1px solid #D4D4D4;
    }
    .user-post-list{
      padding: 60px 10px 0;
      height: 100%;
      h3{
        font-weight: lighter;
        font-size: 18px;
        margin-left: 5px;
        margin-bottom: 15px;
      }
      .mint-loadmore{
        height: 80%;
        overflow: auto;
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
              align-items: center;
              .mui-media-object.mui-pull-left{
                max-width: 45% !important;
                width: 40%;
                height: 35%;;
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
