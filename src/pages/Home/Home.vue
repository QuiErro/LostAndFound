<template>
  <div id="home">
    <div class="headerTop">
      <span class="userInfo" @click="goMeOrLogin"><i class="mui-icon mui-icon-person"></i></span>
      <div class="searchInput">
        <router-link to="/search" class="search-nav-icon">
          <span><i class="mui-icon mui-icon-search"></i></span>
          <span>搜索您需要寻找的物品</span>
        </router-link>
      </div>
      <span class="messageBox"><i class="mui-icon mui-icon-chat"></i></span>
    </div>
    <div class="headerBottom">
      <yd-tab
       active-color="#02A7F0"
       bg-color="#F5F5F5"
       :callback="fn">
        <yd-tab-panel label="失物信息" ></yd-tab-panel>
        <yd-tab-panel label="寻物信息"></yd-tab-panel>
      </yd-tab>
      <mt-button type="default" size="small" @click="sheetVisible = true">{{prop_type}}</mt-button>
    </div>
    <!--选择物品类型-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <router-view></router-view>

    <div class="post-goods" @click="goPostOrLogin">
      <span><i class="mui-icon mui-icon-paperplane"></i></span>
      <span>发布</span>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {mapState} from 'vuex';

  export default {
    name: "Home",
    data(){
      return{
        // 事件类型
        event_type: 'found',  // 失物 寻物
        show_type: 'all', // 显示的分类
        // 物品类型
        sheetVisible: false,
        prop_type: '全部',
        actions: [
          {name: '全部', method: this.selectPropType, type: 'all'},
          {name: '校园卡', method: this.selectPropType, type: 'card'},
          {name: '普通物品', method: this.selectPropType, type: 'common'},
          {name: '贵重物品', method: this.selectPropType, type: 'value'},
        ],
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    created(){
      this.reqLost();
      this.reqFound();
    },
    watch: {
      userInfo(){
        this.reqUserLostPost(this.userInfo.user_id);
        this.reqUserFoundPost(this.userInfo.user_id);
      }
    },
    methods: {
      ...mapActions(['reqFound', 'reqLost','reqUserLostPost', 'reqUserFoundPost']),
      // 修改物品类型
      selectPropType(props) {
        this.prop_type = props.name;
        this.show_type = props.type;

        this.$router.replace('/home/' + this.event_type + '/' + this.show_type);
      },
      // 选项卡切换控制事件类型
      fn(label, key) {
        if(label === "失物信息"){
          this.event_type = 'found';
        }else{
          this.event_type = 'lost';
        }

        this.$router.replace('/home/' + this.event_type + '/' + this.show_type);
      },
      goMeOrLogin(){
        if(this.userInfo.user_id){
          this.$router.push('/me');
        }else{
          this.$router.push('/login');
        }
      },
      goPostOrLogin(){
        if(this.userInfo.user_id){
          this.$router.push('/post');
        }else{
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  #home{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    position: relative;
    .headerTop{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      height: 40px;
      width: 100%;
      .userInfo{
        width: 12%;
        text-align: center;
      }
      .searchInput{
        width: 75%;
        .search-nav-icon{
          background-color: #e8e8e8;
          border-radius: 10px;

          display: flex;
          justify-content: center;
          align-items: center;
          span{
            color: #aaa;
            margin-left: 6px;
            font-size: 13px;
            font-weight: lighter;
          }
        }
      }
      .messageBox{
        width: 13%;
        text-align: center;
      }
    }
    .headerBottom{
      padding: 5px;
      border-bottom: 1px solid #D4D4D4;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .yd-tab{
        width: 60%;
      }
      .mint-button{
        font-size: 12px;
        margin: 0px 5px;
        background: #fff;
        border-radius: 7px;
      }
    }
    .post-goods{
      position: fixed;
      right: 15px;
      bottom: 40px;
      width: 70px;
      height: 70px;
      border: 1px solid #169BD5;
      border-radius: 50%;
      background: #169BD5;
      opacity: 0.7;
      font-size: 14px;
      color: white;
      font-weight: bolder;
      z-index: 999;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      i{
        font-size: 30px;
      }
    }
  }
</style>
