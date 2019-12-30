<template>
  <div id="home">
    <!-- 顶部 -->
    <div class="headerTop">
      <span class="userInfo" @click="goMeOrLogin">
        <img :src="userInfo.avatar" v-if="userInfo.avatar">
        <img src="../../images/user.jpg" v-else>
      </span>
      <div class="searchInput">
        <router-link to="/search" class="search-nav-icon">
          <van-icon name="search"/>
          <span>搜索您需要寻找的物品</span>
        </router-link>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="headerSwiper" v-if="cardCovers">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in cardCovers" :key="index" @click="gotoCards(index)">
          <img :src="image.cover_image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 选项卡 -->
    <div class="headerBottom">
      <van-tabs @click="tabsChange" color="#02A7F0" background="#F5F5F5">
        <van-tab title="失物招领"></van-tab>
        <van-tab title="寻物启事"></van-tab>
      </van-tabs>
      <select class="select-btn" ref="prop_type" @change="selectPropType">
        <option value="all">全部</option>
        <option value="0">校园卡</option>
        <option value="1">普通物品</option>
        <option value="2">贵重物品</option>
      </select>
    </div>
    <!-- 物品展示 -->
    <div class="goods-container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="goodsArr.length">
        <GoodsItem v-for="(item) in goodsArr" :key="item._id" :goods="item" :status="event_type"/>
      </van-pull-refresh>
      <NoData v-else />
    </div>
    <!-- 右下发布按钮 -->
    <div class="post-goods" @click="goPostOrLogin">
      <span>
        <svg t="1573827999249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1347" width="200" height="200"><path d="M933.546667 198.826667c-9.045333-13.653333-21.504-9.045333-22.528-8.874667L102.912 390.997333c-7.509333 1.877333-13.312 7.68-15.36 15.018667-2.048 7.509333 0 15.36 5.461333 20.821333l152.405333 151.552 43.690667 238.933333c0 0.512 1.706667 14.165333 16.042667 16.896 11.946667 2.218667 17.92-3.754667 18.261333-3.925333l97.450667-77.482667 76.288 75.946667c4.608 4.437333 10.752 6.826667 17.066667 6.144 6.314667-0.682667 11.946667-3.925333 15.701333-9.386667l403.968-602.794667C934.4 221.866667 941.226667 210.602667 933.546667 198.826667zM150.016 423.253333l611.84-152.064L268.970667 541.525333 150.016 423.253333zM314.538667 718.677333l-25.429333-139.434667 348.16-190.976L353.621333 595.456c0 0-3.754667 3.072-5.290667 5.12-1.365333 1.877333-2.730667 6.314667-2.730667 6.314667L314.538667 718.677333zM370.858667 675.84l30.890667 37.717333-53.248 42.325333L370.858667 675.84zM509.952 778.581333l-125.098667-153.088 0 0L831.146667 299.349333 509.952 778.581333z" p-id="1348" fill="#ffffff"></path></svg>
      </span>
      <span>发布</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import {getAllFound, getAllLost, getCateLost, getCateFound, getFoundCards} from '@/service/api/index'
  import GoodsItem from '@/components/GoodsItem/GoodsItem'
  import NoData from '@/components/NoData/NoData'
  import {Toast} from 'vant'

  export default {
    name: "Home",
    components: {
      GoodsItem,
      NoData
    },
    data(){
      return{
        // 事件类型
        event_type: 'found',  // 失物 寻物
        goods_type: 'all', // 显示的分类
        goodsArr: [],
        isLoading: false,
      }
    },
    computed:{
      ...mapState(['userInfo', 'cardCovers', 'lastedMonths']),
    },
    watch: {
      $route(){
        if(this.$route.path === '/home'){
          this.getGoodsArr();
        }
      }
    },
    created(){
      this.reqCardCovers();
      this.initAllFound();
    },
    methods: {
      ...mapActions(['reqCardCovers', 'reqStudentsCard', 'synStudentsCard']),

      // 初始化物品列表（失物招领 全部）
      async initAllFound(){
        const res = await getAllFound();
        if(res.status === 200){
          this.goodsArr = res.result.data;
        }
      },
      // 请求物品列表
      async getGoodsArr(){
        this.goodsArr = [];
        let goods_type = this.$refs.prop_type.value === 'all' ? 'all' : Number(this.$refs.prop_type.value);
        let res;
        if(goods_type === 'all'){
          if(this.event_type === 'found'){
            res = await getAllFound();
          }else{
            res = await getAllLost();
          }
        }else{
          if(this.event_type === 'found'){
            res = await getCateFound(goods_type);
          }else{
            res = await getCateLost(goods_type);
          }
        }
        if(res.status === 200){
          this.goodsArr = res.result.data;
        }
      },
      // 修改物品类型
      selectPropType() {
        this.goods_type = this.$refs.prop_type.value;
        this.getGoodsArr();
      },
      // 选项卡切换控制事件类型
      tabsChange(name, title) {
        if(title === "失物招领"){
          this.event_type = 'found';
        }else{
          this.event_type = 'lost';
        }
        this.getGoodsArr();
      },
      // 下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      },
      // 点击头像
      goMeOrLogin(){
        if(this.userInfo.sid){
          this.$router.push('/me');
        }else{
          this.$router.push('/login');
        }
      },
      // 点击发布按钮
      goPostOrLogin(){
        if(this.userInfo.sid){
          this.$router.push('/post');
        }else{
          this.$router.push('/login');
        }
      },
      // 前往某月未认领学生卡集合
      async gotoCards(index){
        let month = this.lastedMonths[index];
        const res = await getFoundCards(month);
        if(res.status === 200){
          if(res.result.data.length){
            this.synStudentsCard(res.result.data);
            this.$router.push(`/students_card/${month}`);
          }else{
            Toast('本月没有未认领的学生卡!');
          }
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
      justify-content: flex-start;
      align-items: center;

      margin-top: 1rem;
      height: 5rem;
      width: 100%;
      padding-left: 1rem;
      .userInfo{
        width: 12%;
        text-align: center;
        margin-right: 1rem;
        img{
          width: 3.8rem;
          height: 3.8rem;
          border-radius: 50%;
          background-size: cover;
        }
      }
      .searchInput{
        padding: 1rem;
        width: 80%;
        .search-nav-icon{
          width: 100%;
          height: 3.2rem;
          font-size: 14px;
          background-color: #e8e8e8;
          border-radius: 1rem;

          display: flex;
          justify-content: center;
          align-items: center;
          span{
            margin-left: 6px;
            color: #aaa;
            font-weight: lighter;
          }
          .van-icon{
            font-size: 18px;
          }
        }
      }
    }
    .headerSwiper{
      padding: 1rem 1.6rem;
      height: 16.5rem;
      .van-swipe{
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
    .headerBottom{
      position: relative;
      padding: 5px 0;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .van-tabs{
        width: 20rem;
        font-size: 15px;
        .van-tabs__line{
          width: 4rem;
        }
      }
      .select-btn{
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 7.2rem;
        height: 3rem;
        border-radius: 7px;
        border: 1px solid rgba(2, 167, 240, 0.7) !important;
        line-height: 3rem;
        font-size: 12px;
        text-align: center;
        text-align-last: center;
      }
    }
    .post-goods{
      position: fixed;
      right: 1.5rem;
      bottom: 4rem;
      width: 6.5rem;
      height: 6.5rem;
      border: 1px solid #169BD5;
      border-radius: 50%;
      background: #169BD5;
      opacity: 0.7;
      color: white;
      z-index: 999;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg{
        width: 4rem;
        height: 4rem;
      }
      span{
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
  }
</style>
