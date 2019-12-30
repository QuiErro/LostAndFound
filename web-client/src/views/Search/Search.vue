<template>
  <div class="search">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="搜索"
      left-arrow
      @click-left="goBack"
    />
    <!--搜索面板-->
    <div class="search-panel">
      <div class="search-nav">
        <div class="search-input">
          <img src="./images/search.png" alt="" width="25"/>
          <input ref="mySearch" type="search" v-model="search_name"/>
        </div>
        <van-button type="info" size="small" @click="search">搜索</van-button>
      </div>
      <div class="post-cell-item">
        <van-button :type="event_type ? 'default' : 'info' " size="mini" @click="choiceType(0)">失物招领</van-button>
        <van-button :type="event_type ? 'info' : 'default' " size="mini" @click="choiceType(1)">寻物启事</van-button>
        <select class="select-btn" ref="prop_type" @change="selectPropType">
          <option value="0">校园卡</option>
          <option value="1">普通物品</option>
          <option value="2">贵重物品</option>
        </select>
      </div>
      <div class="search-content">
        <div class="goods-list">
          <div v-if="searchContent.length">
            <GoodsItem v-for="(obj) in searchContent" :key="obj._id" :goods="obj" :status="event_type === 0 ? 'found' : 'lost' " />
          </div>
          <NoData v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import GoodsItem from '@/components/GoodsItem/GoodsItem'
  import NoData from '@/components/NoData/NoData'
  import {getFoundInfo, getLostInfo} from '@/service/api/index'
  import {Toast} from 'vant'

  export default {
    name: "Search",
    components: {
      GoodsItem,
      NoData
    },
    data() {
      return {
        search_name: '', // 搜索框的内容
        event_type: 0,  // 事件类型   0--失物  1--寻物
        show_type: 0, // 显示的分类
        searchContent: []
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
      // 选择事件类型
      choiceType(flag){
        this.event_type = flag;
      },
      // 修改物品类型
      selectPropType(props) {
        this.show_type = this.$refs.prop_type.value;
      },
      async search(){
        this.isShow = false;
        if(!this.search_name){
          Toast('搜索框的内容不得为空!');
          return;
        }
        if(!this.event_type){
          this.searchContent = [];
          const res = await getFoundInfo(this.search_name, this.show_type);
          if(res.result.data.length){
            this.searchContent = res.result.data;
          }
        }else{
          this.searchContent = [];
          const res = await getLostInfo(this.search_name, this.show_type);
          if(res.result.data.length){
            this.searchContent = res.result.data;
          }
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
    .van-button--info{
      background: #169BD5 !important;
      border: 1px solid #169BD5 !important;
    }
    .van-nav-bar {
       z-index: 99;
       background: #f5f5f5;
       border-bottom: 1px solid #D4D4D4;
    }
    .search-panel{
      width: 100%;
      height: 100%;
      margin-top: 4rem;
      padding-top: 2rem;
      background-color: #fff;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      .post-cell-item{
        padding: 1rem 1rem 1rem 2rem;
        position: relative;
        display: flex;
        justify-content: flex-start;
        .select-btn{
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 8rem;
          height: 3rem;
          border-radius: 7px;
          border: 1px solid rgba(2, 167, 240, 0.7) !important;
          line-height: 3rem;
          font-size: 14px;
          text-align: center;
          text-align-last: center;
        }
        .van-button{
          margin-right: 2rem;
          width: 8rem;
          height: 3rem;
          font-size: 14px;
          border-radius: 7px;
          background: #f5f5f5;
          border: 1px solid #d4d4d4;
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
        .van-button{
          width: 15%;
          height: 3.6rem;
          font-size: 15px;
          background: #169BD5 !important;
          border: 1px solid #169BD5 !important;
        }
        .search-input{
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 85%;
          height: 3.6rem;
          border-radius: 5px;
          background-color: #ededed;
          padding: 0 1rem;
          input{
            background-color: #ededed;
            width: 90%;
            height: 90%;
            padding-left: 1rem;
            color: #aaa;
            font-size:6px;
            outline: none;
            margin-bottom: 0;
            padding: .5rem 1.5rem;
            font-size: 14px;
          }
        }
      }
    }
    .search-content{
      padding: 3rem 1.5rem;
    }
  }
</style>
