<template>
  <div class="goods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed :title="selected_found_goods.name">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-img" v-if="selected_found_goods.picture">
        <yd-slider autoplay="2000" speed="500">
          <yd-slider-item v-for="(picture, index) in selected_found_goods.picture" :key="index">
            <img :src="'http://47.112.10.160:3389/image/' + selected_found_goods.picture[index]">
          </yd-slider-item>
        </yd-slider>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>{{selected_found_goods.name}}</span></div>
        <div v-if="selected_found_goods.student_id"><h4>学号:</h4><span>{{selected_found_goods.student_id}}</span></div>
        <div><h4>拾到地点:</h4><span>{{selected_found_goods.place}}</span></div>
        <div><h4>拾到时间:</h4><span>{{selected_found_goods.time}}</span></div>
        <div><h4>交接方式:</h4><span>{{selected_found_goods.contact_way}}</span></div>
      </div>
      <div id="allmap"></div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>{{selected_found_goods.info}}</div>
      </div>
      <div class="post-time"><span>发布时间：{{selected_found_goods.create_time}}</span></div>
      <div class="post-btn" v-if="!selected_found_goods.found"><mt-button type="danger" size="small" @click="close_post(selected_found_goods.item_id)">关闭</mt-button></div>
      <div class="post-btn" v-else><mt-button type="danger" size="small" disabled>已关闭</mt-button></div>
    </div>
  </div>
</template>

<script>
  import {finishFound} from './../../../../api/index';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import { MessageBox } from 'mint-ui';

  export default {
    name: "MyPostFoundGoods",
    data() {
      return {
        lat: 0,
        lng: 0
      }
    },
    mounted(){
      this.lat = this.selected_found_goods.latitude;
      this.lng = this.selected_found_goods.longitude;
      this.baiduMap();
    },
    computed:{
      ...mapState(['selected_found_goods', 'userInfo']),
    },
    watch:{
      selected_found_goods(){
        this.lat = this.selected_found_goods.latitude;
        this.lng = this.selected_found_goods.longitude;
        this.baiduMap();
      }
    },
    methods: {
      ...mapActions(['reqUserFoundPost', 'reqFound']),
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      close_post(item_id){
        MessageBox.confirm('您确定关闭本条信息吗?').then(action => {
          if('confirm' === action){
            this.editState(item_id);
          }
        });
      },
      async editState(item_id){
        const result = await finishFound(item_id);
        if(result.error_code === 0){
          this.$dialog.toast({
            mes: '关闭成功',
            icon: 'success',
            timeout: 1000
          });
          this.reqUserFoundPost(this.userInfo.user_id);
          this.reqFound();
        }else{
          this.$dialog.toast({
            mes: result.error_msg,
            icon: 'error',
            timeout: 1000
          });
        }
      },
      baiduMap () {
        var map = new BMap.Map('allmap');
        var point = new BMap.Point(this.lng, this.lat);
				map.centerAndZoom(point, 17);
				map.addControl(new BMap.MapTypeControl({
					mapTypes: [
						BMAP_NORMAL_MAP,
						BMAP_HYBRID_MAP
					]
				}));
				map.setCurrentCity("福州");
				map.enableScrollWheelZoom(true);
				var marker =new BMap.Marker(point)// 创建标注
        map.addOverlay(marker)// 将标注添加到地图中
        // 触摸移动时触发此事件 此时开启可以拖动。虽然刚初始化该地图不可以拖动，但是可以触发拖动事件。
				map.addEventListener("touchmove", function (e) {
				  map.enableDragging();
				});
				// 触摸结束时触发次此事件  此时开启禁止拖动
				map.addEventListener("touchend", function (e) {
				  map.disableDragging();
				});

				// 初始化地图 禁止拖动   注：虽禁止拖动，但是可以出发拖动事件
				map.disableDragging();
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
      padding: 60px 10px 0;
      .post-img{
        height: 45%;
        margin-bottom: 20px;
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
        margin: 10px 0;
        width: 100%;
        height: 25%;
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
          h4{
            font-weight: bolder;
            margin-right: 10px;
            font-size: 12px;
          }
        }
      }
      #allmap{
        padding: 10px;
        width: 100%;
        height: 20%;
        margin-bottom: 15px;
      }
      .post-detail{
        padding: 10px;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 2px 2px 5px #D9D9D9;
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
          color: #fff;
          width: 120px;
        }
      }
    }
  }
</style>
