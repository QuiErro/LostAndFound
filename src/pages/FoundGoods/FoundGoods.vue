<template>
  <div class="foundgoods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_goods.name">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-user" @click="goUser(selected_goods.creator)">
        <img :src="'http://47.112.10.160:3389/image/' + selected_goods.creator.photo" v-if="selected_goods.creator.photo">
        <img src="./image/user.jpg" v-else>
        <span>{{selected_goods.creator.username}}</span>
      </div>
      <div class="post-img" v-if="showImage && selected_goods.picture">
        <yd-slider autoplay="2500" speed="1000">
          <yd-slider-item v-for="(pic, index) in selected_goods.picture" :key="index">
            <img :src="'http://47.112.10.160:3389/image/' + pic">
          </yd-slider-item>
        </yd-slider>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{selected_goods.name}}</span></div>
		    <div v-if="selected_goods.student_id"><h4>学号:</h4><span>{{selected_goods.student_id}}</span></div>
        <div v-if="selected_goods.student_name"><h4>姓名:</h4><span>{{selected_goods.student_name}}</span></div>
        <div><h4>拾到地点:</h4><span>{{selected_goods.place}}</span></div>
        <div><h4>拾到时间:</h4><span>{{selected_goods.time}}</span></div>
        <div><h4>交接方式:</h4><span>{{selected_goods.contact_way}}</span></div>
      </div>
      <div id="allmap"></div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>{{selected_goods.info}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{selected_goods.create_time}}</span></div>
      <div class="post-btn" v-if="selected_goods.found"><mt-button type="danger" size="small" disabled>已关闭</mt-button></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "FoundGoods",
    data() {
      return {
        lat: 0,
        lng: 0,
        map: null,
        showImage: true,
      }
    },
    mounted(){
      this.lat = this.selected_goods.latitude;
      this.lng = this.selected_goods.longitude;
      this.baiduMap();
    },
    computed:{
      ...mapState(['selected_goods','userInfo']),
    },
    watch:{
      $route(){
        if(this.$route.path.includes('/foundgoods')){
          if(this.selected_goods.picture){
            this.showImage = true;
          }
          this.lat = this.selected_goods.latitude;
          this.lng = this.selected_goods.longitude;
          this.map = null;
          this.baiduMap();
        }
      }
    },
    methods: {
      ...mapActions(['reqOtherUserLostPost', 'reqOtherUserFoundPost',"synSeletedUser"]), // 同步本地存储的用户选择的经纬度
      goBack() {
        // 点击后退
        this.showImage = false;
        this.$router.go(-1);
      },
      goUser(user){
        if(this.userInfo.user_id === user.user_id){
          this.$router.push('/me');
          return;
        }
        this.reqOtherUserLostPost(user.user_id);
        this.reqOtherUserFoundPost(user.user_id);
        this.synSeletedUser(user);
        this.$router.push('/user/' + user.user_id);
      },
      baiduMap () {
        this.map = new BMap.Map('allmap');
        let point = new BMap.Point(this.lng, this.lat);
				this.map.centerAndZoom(point, 17);
				this.map.addControl(new BMap.MapTypeControl({
					mapTypes: [
						BMAP_NORMAL_MAP,
						BMAP_HYBRID_MAP
					]
        }));
        let _this = this;
				this.map.setCurrentCity("福州");
				this.map.enableScrollWheelZoom(true);
				let marker = new BMap.Marker(point)// 创建标注
        this.map.addOverlay(marker)// 将标注添加到地图中
        // 触摸移动时触发此事件 此时开启可以拖动。虽然刚初始化该地图不可以拖动，但是可以触发拖动事件。
				this.map.addEventListener("touchmove", function (e) {
				  _this.map.enableDragging();
				});
				// 触摸结束时触发次此事件  此时开启禁止拖动
				this.map.addEventListener("touchend", function (e) {
				  _this.map.disableDragging();
				});

				// 初始化地图 禁止拖动   注：虽禁止拖动，但是可以出发拖动事件
				this.map.disableDragging();
			},
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
  .foundgoods{
    background: #F5F5F5;
    width: 100%;
    height: 100%;
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
    .goods-content{
      width: 100%;
      height: 100%;
      padding: 40px 10px 0;
      .post-user{
        height: 8%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .post-img{
        margin-top: 5px;
        height: 45%;
        div{
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            -webkit-transform: scale(1.03);
            -moz-transform: scale(1.03);
            -ms-transform: scale(1.03);
            -o-transform: scale(1.03);
            transform: scale(1.03);
          }
        }
      }
      .post-basic{
        margin: 15px 0;
        padding: 10px 5px 5px;
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: 7px;
        box-shadow: 2px 2px 5px #D9D9D9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div{
          display: flex;
          flex-direction: row;
          font-size: 12px;
          margin-left: 8px;
          margin-bottom: 5px;
          h4{
            font-weight: bolder;
            margin-right: 10px;
            font-size: 12px;
          }
          span{
            font-size: 12px;
          }
        }
      }
      #allmap{
        padding: 10px;
        width: 100%;
        height: 25%;
        margin-bottom: 15px;
      }
      .post-detail{
        padding: 10px;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 1px 1px 4px #dfdfdf;
        display: flex;
        flex-direction: column;
        h4{
          flex: 2;
          font-size: 14px;
        }
        div{
          flex: 10;
          font-size: 13px;
        }
      }
      .post-time{
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        font-weight: bolder;
        color: #bfbfbf;
      }
      .post-btn{
        text-align: center;
        margin: 10px 0 ;
        .mint-button{
          border-radius: 5px;
          width: 120px;
        }
      }
    }
  }
</style>
