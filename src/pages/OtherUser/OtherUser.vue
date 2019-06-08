<template>
  <div class="other-user">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="`${otheruser.username}的主页`">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="user-info-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
          <a>
            <img class="mui-media-object mui-pull-left" :src="'http://47.112.10.160:3389/image/' + otheruser.photo" v-if="otheruser.photo">
            <img class="mui-media-object mui-pull-left" src="./image/user.jpg" v-else>
            <div class="mui-media-body">
              <h1>{{otheruser.username}}</h1>
              <p class='mui-ellipsis'>
                <span><i class="mui-icon mui-icon-email"></i>私信ta</span>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <router-link to="/userfoundpost" tag="div" class="options">
      <h3>ta发布的失物招领</h3>
      <span><i class="mui-icon mui-icon-forward"></i></span>
    </router-link>
    <router-link to="/userlostpost" tag="div" class="options">
      <h3>ta发布的寻物启事</h3>
      <span><i class="mui-icon mui-icon-forward"></i></span>
    </router-link>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "OtherUser",
    data() {
      return {
      }
    },
    computed:{
      ...mapState(['otheruser'])
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
        },1000);
      },
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .other-user{
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
    .user-info-content{
      padding: 60px 10px 10px;
      border-bottom: 1px solid #D4D4D4;
      .mui-table-view:before{
        background: #f5f5f5 !important;
      }
      .mui-table-view:after{
        background: #f5f5f5 !important;
      }
      .mui-table-view {
        background: #F5F5F5;
        li {
          margin: 0 5px 10px;
          background: #77CBF0;
          border: 1px solid #77CBF0;
          border-radius: 10px;
          a{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding-left: 30px;
            .mui-media-object.mui-pull-left{
              width: 42px;
              height: 42px;
              max-width: 30%;
              border-radius: 50%;
              margin-right: 20px;
            }
            .mui-media-body{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              h1 {
                font-size: 16px;
                color: #ffffff;
              }
              .mui-ellipsis {
                font-size: 12px;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                i{
                  font-size: 16px;
                  display: inline-block;
                  margin: 0 3px;
                }
              }
            }
          }
        }
      }
    }
    .user-post-list{
      padding: 15px 10px 0;
      height: 58%;
      h3{
        font-weight: lighter;
        font-size: 18px;
        margin-left: 5px;
        margin-bottom: 5px;
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
    .options{
      border-top: 1px solid #D4D4D4;
      border-bottom: 1px solid #D4D4D4;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3{
        font-size: 18px;
        font-weight: lighter;
      }
      i{
        color: #7F7F7F;
      }
    }
    .logout-btn{
      text-align: center;
      margin: 60px 0 ;
      .mint-button{
        border-radius: 5px;
       /**
	    color: #333;
        background: rgba(2, 167, 240, 0.505882352941176);
		*/
		color: #fff;
        width: 120px;
      }
    }
  }
</style>
