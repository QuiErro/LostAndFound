<template>
  <div class="goods">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="物品主页"
      left-arrow
      @click-left="goBack"
    />
    <div class="goods-content">
      <div class="post-user" v-if="curGoods.user_id != userInfo.sid">
        <img :src="curGoods.user_avatar" v-if="curGoods.user_avatar">
        <img src="./image/user.jpg" v-else>
        <div @click="gotoUser">{{curGoods.user_name}}</div>
      </div>
      <div class="post-img" v-if="curGoods.goods_image">
        <van-image
          width="100%"
          height="26rem"
          fit="fill"
          :src="curGoods.goods_image"
        />
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{curGoods.goods_name}}</span></div>
		    <div v-if="curGoods.student_id"><h4>学号:</h4><span>{{curGoods.student_id}}</span></div>
        <div v-if="curGoods.student_name"><h4>姓名:</h4><span>{{curGoods.student_name}}</span></div>
        <div><h4>{{curGoods.event_type === 'found' ? '拾到' : '丢失'}}地点:</h4><span>{{curGoods.place}}</span></div>
        <div><h4>{{curGoods.event_type === 'found' ? '拾到' : '丢失'}}时间:</h4><span>{{curGoods.time}}</span></div>
        <div><h4>交接方式:</h4><span>{{curGoods.contact_way}}</span></div>
      </div>
      <div id="allmap"></div>
      <div class="post-detail" >
        <h4>详细信息</h4>
        <div>{{curGoods.info || '暂无'}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{curGoods.create_time | timeFormat}}</span></div>
      <div class="post-btn" v-if="curGoods.state && curGoods.user_id != userInfo.sid"><van-button type="danger" size="normal" disabled>已关闭</van-button></div>
      <div class="post-btn" v-if="curGoods.user_id === userInfo.sid"><van-button type="danger" size="normal" @click="changeState">{{curGoods.state ? '开启' : '关闭'}}该信息</van-button></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import {closeFound, closeLost} from '@/service/api/index';
  import {Dialog, Toast} from 'vant';

  export default {
    name: "Goods",
    data() {
      return {
        lat: 0,
        lng: 0,
        map: null,
      }
    },
    mounted(){
      this.lat = this.curGoods.latitude;
      this.lng = this.curGoods.longitude;
      this.baiduMap();
    },
    computed:{
      ...mapState(['curGoods', 'userInfo']),
    },
    watch: {
      $route(){
        if(this.$route.params.id){
          this.lat = this.curGoods.latitude;
          this.lng = this.curGoods.longitude;
          this.baiduMap();
        }
      }
    },
    methods: {
      ...mapActions(['getOtherUserInfo']),
      goBack() {
        // 点击后退
        this.showImage = false;
        this.$router.go(-1);
      },
      gotoUser(){
        this.getOtherUserInfo(this.curGoods.user_id);
        this.$router.push(`/user/${this.curGoods.user_id}`);
      },
      changeState(){
        let state = this.curGoods.state;
        let res;
        Dialog.confirm({
          title: '确认',
          message: `您是否要${state ? '开启' : '关闭'}该信息？`
        }).then(async () => {
          if(this.curGoods.event_type === 'found'){
            res = await closeFound(this.curGoods._id);
            console.log(res)
          }else if(this.curGoods.event_type === 'lost'){
            res = await closeLost(this.curGoods._id);
          }
          if(res.status === 200){
            Toast.success(`${state ? '开启' : '关闭'}成功`);
            this.$router.go(-1);
          }
        }).catch(() => {
          // on cancel
        });
      },
      baiduMap () {
        this.map = null;
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
      padding: 1rem 1rem 0;
      .post-user{
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        div{
          max-width: 10rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img{
          width: 3.6rem;
          height: 3.6rem;
          border-radius: 50%;
          margin-right: 1rem;
        }
      }
      .post-img{
        margin-top: .5rem;
      }
      .post-basic{
        margin: 1.5rem 0;
        padding: 1rem .5rem;
        width: 100%;
        height: auto;
        font-size: 14px;
        background: #fff;
        border-radius: 7px;
        box-shadow: 2px 2px 5px #D9D9D9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div{
          display: flex;
          flex-direction: row;
          margin-left: .8rem;
          margin-bottom: .8rem;
          h4{
            font-weight: bolder;
            margin-right: 1rem;
          }
        }
      }
      #allmap{
        padding: 10px;
        width: 100%;
        height: 18rem;
        margin-bottom: 1.5rem;
      }
      .post-detail{
        padding: 1rem;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 1px 1px 4px #dfdfdf;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h4{
          flex: 2;
          font-size: 16px;
          font-weight: bold;
        }
        div{
          flex: 9;
          font-size: 14px;
        }
      }
      .post-time{
        margin-top: 1rem;
        padding-bottom: 0.2rem;
        text-align: right;
        font-size: 12px;
        font-weight: bolder;
        color: #bfbfbf;
      }
      .post-btn{
        text-align: center;
        margin: 1rem 0 ;
        .van-button{
          border-radius: 5px;
          width: 12rem;
        }
      }
    }
  }
</style>
