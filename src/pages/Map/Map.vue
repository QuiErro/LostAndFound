<template>
  <div id="mapShow">
     <!-- 顶部 Header 区域 -->
    <mt-header fixed title="地图">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
  	<div class="map-box">
      <div id="nav-bar">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">当前经纬度:</span>
            <yd-input slot="right" :show-success-icon="false" :show-error-icon="false" id="LatlngMsg" disabled :value="latlngStr" style="margin-bottom: 10px;padding: 10px 5px;"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <yd-button type="hollow" @click.native="selectLngLat" :disabled="$route.path.includes('/viewmap')">确定坐标</yd-button>
      </div>
      <div id="allmap"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'
	export default {
	  data() {
	    return {
        lat: 0,
        lng: 0
	    };
	  },
	   mounted () {
      this.lat = this.lnglat.lat;
      this.lng = this.lnglat.lng;
      this.baiduMap();
     },
    computed: {
      ...mapState(['lnglat']),
      latlngStr(){
        return this.lng + ', ' + this.lat;
      },
    },
    watch:{
      lnglat(){
        this.lat = this.lnglat.lat;
        this.lng = this.lnglat.lng;
        this.baiduMap();
      }
    },
	  methods: {
      ...mapActions(['synLngLat']), // 同步本地存储的用户选择的经纬度
	  	goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      selectLngLat(){
        this.synLngLat({
          lat: this.lat,
          lng: this.lng
        });
        this.$router.go(-1);
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
				//var marker2;
				map.addOverlay(marker)// 将标注添加到地图中

				map.addEventListener("click", (e)=>{
          if(this.$route.path.includes('/choosemap')){
            map.clearOverlays(marker);
            marker =new BMap.Marker(e.point)// 创建标注
            map.addOverlay(marker)// 将标注添加到地图中
            this.lng = e.point.lng;
            this.lat = e.point.lat;
          }
				/**
         * if(marker2){
			    		map.removeOverlay(marker2);
			    	}
				    marker2 =new BMap.Marker(e.point)// 创建标注
				    map.addOverlay(marker2)// 将标注添加到地图中
         *  */
				});
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

				map.enableScrollWheelZoom(true);
			},
	  }
	};

</script>

<style scoped lang="less" ref="stylesheet/less">
#mapShow{
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  position: relative;
  .mint-header {
    z-index: 99;
    background: #f5f5f5;
    height: 40px;
    color: #000;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #D4D4D4;
  }
  .map-box{
    padding: 40px 10px 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    #allmap{
      width: 100%;
      height: 85%;
    }
    #nav-bar{
      height: 15%;

      display: flex;
      align-items: center;
      .yd-cell-box{
        margin-bottom: 0;
        .yd-cell-item{
          height: 35px;
        }
      }
      .yd-btn{
        width: 20%;
        height: 50%;
        font-size: 12px;
      }
    }
  }
  .mui-input{
    margin-bottom: 10px !important;
    padding: 10px 1px !important;
  }
}
</style>
