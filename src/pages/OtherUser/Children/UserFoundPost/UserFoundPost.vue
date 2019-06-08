<template>
  <div class="user-found-post">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="`${otheruser.username}的发布`">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="user-post-list" v-if="otheruserFoundContent.length">
      <h3>{{otheruser.username}}发布的失物招领</h3>
      <div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(obj, index) in otheruserFoundContent" :key="index" :class="{mask: obj.found}">
            <a @click="goPostFoundGoods(obj)">
              <img class="mui-media-object mui-pull-left"  :src="'http://47.112.10.160:3389/image/' + obj.picture[0]" v-if="obj.picture">
              <div class="mui-media-body">
                <h1>{{obj.name}}</h1>
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
    </div>
    <div class="user-post-list" v-else>暂无发布记录</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "UserFoundPost",
    data() {
      return {
        isShowTips: true,
      }
    },
    computed:{
      ...mapState(['otheruserFoundContent', 'otheruser']),
    },
    methods: {
      ...mapActions(['synSeletedGoods']),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      goPostFoundGoods(obj){
        this.$router.push('/foundgoods/' + obj.item_id);
        this.synSeletedGoods(obj);
      },
    }
  }
</script>
<style scoped lang="less" ref="stylesheet/less">
  .user-found-post{
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
      div{
        height: auto;
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
            color: rgb(170,170,170);
            p.mui-ellipsis{
              color: rgb(178, 178, 178)
            }
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
                max-width: 32% !important;
                width: 32%;
                height: 30%;;
                margin-right: 20px;
              }
              .mui-media-body{
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                h1 {
                  padding-left: 5px;
                  font-size: 16px;
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
