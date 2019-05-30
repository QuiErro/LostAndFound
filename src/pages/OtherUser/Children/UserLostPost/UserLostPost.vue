<template>
  <div class="user-lost-post">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="`${otherusername}的发布`">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="user-post-list" v-if="otheruserLostContent.length">
      <h3>{{otherusername}}发布的寻物启事</h3>
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottomDistance="30" bottomPullText="上拉加载更多">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(obj, index) in otheruserLostContent" :key="index" :class="{mask: obj.found}">
            <a @click="goPostLostGoods(obj)">
              <img class="mui-media-object mui-pull-left" :src="obj.picture_b64" v-if="obj.picture_b64">
              <div class="mui-media-body">
                <h1>{{obj.name}}</h1>
                <p class='mui-ellipsis'>
                  <span>丢失时间：{{obj.time}}</span>
                  <span>丢失地点：{{obj.place}}</span>
                  <span class="post-time">{{obj.create_time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </mt-loadmore>
    </div>
    <div class="user-post-list" v-else>暂无发布记录</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "UserLostPost",
    data() {
      return {
        isShowTips: true,
        allLoaded: false
      }
    },
    computed:{
      ...mapState(['otheruserLostContent', 'otherusername']),
    },
    methods: {
      ...mapActions(['synSeletedGoods']),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      goPostLostGoods(obj){
        this.$router.push('/lostgoods/' + obj.item_id);
        this.synSeletedGoods(obj);
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
  .user-lost-post{
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
      padding: 60px 10px;
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
          li.mask{
            background: rgba(204,204,204,0.3);
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
                align-items: flex-start;
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
