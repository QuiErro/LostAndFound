<template>
  <div class="goods">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="goBack"
    />
    <div class="goods-content"  v-if="goodsList.length">
      <GoodsItem v-for="(goods) in goodsList" :key="goods._id" :goods="goods" :status="type" />
    </div>
    <NoData v-else />
  </div>
</template>

<script>
  import {getUserFound, getUserLost} from '@/service/api/index';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import GoodsItem from '@/components/GoodsItem/GoodsItem'
  import NoData from '@/components/NoData/NoData'

  export default {
    name: "MyPost",
    data() {
      return {
        title: '',
        type: '',
        goodsList: []
      }
    },
    components: {
      GoodsItem,
      NoData
    },
    mounted(){
      this.reqList();
    },
    computed: {
      ...mapState(['otherUserInfo']),
    },
    watch: {
      $route(){
        if(this.$route.params && this.$route.params.type){
          this.reqList();
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      async reqList(){
        let type = this.$route.params.type;
        let sid = this.otherUserInfo.sid;
        this.type = type;
        this.goodsList = [];
        if(type === 'found'){
          this.title = 'Ta发布的失物招领';
          const res = await getUserFound(sid);
          if(res.status === 200){
            this.goodsList = res.result.data;
          }
        }else if(type === 'lost'){
          this.title = 'Ta发布的寻物启事';
          const res = await getUserLost(sid);
          if(res.status === 200){
            this.goodsList = res.result.data;
          }
        }
      },
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .goods{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
    font-size: 14px;
    .van-nav-bar {
       z-index: 99;
       background: #f5f5f5;
       border-bottom: 1px solid #D4D4D4;
    }
    .goods-content{
      width: 100%;
      height: 100%;
      padding: 6rem 1rem 0;
    }
  }
</style>
