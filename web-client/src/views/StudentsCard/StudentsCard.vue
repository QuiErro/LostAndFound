<template>
  <div id="prop-list">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      :title="month + '月未认领学生卡'"
      left-arrow
      @click-left="goBack"
    />
      <div class="goods-list"  v-if="studentsCard.length">
        <GoodsItem v-for="(goods) in studentsCard" :key="goods._id" :goods="goods" status="found" />
      </div>
      <NoData v-else />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import GoodsItem from '@/components/GoodsItem/GoodsItem'
  import NoData from '@/components/NoData/NoData'

  export default {
    name: "StudentCards",
    data(){
      return{
        
      }
    },
    components: {
      GoodsItem,
      NoData
    },
    computed:{
      ...mapState(['studentsCard']),
      month(){
        return this.$route.params.month;
      },
    },
    methods:{
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
#prop-list{
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  display: flex;
  flex-direction: column;

  .van-nav-bar {
    z-index: 99;
    background: #f5f5f5;
    border-bottom: 1px solid #D4D4D4;
  }

  .goods-list{
    padding: 50px 10px 10px;
  }
}
</style>
