<template>
  <div id="mapShow">
     <!-- 顶部 Header 区域 -->
    <van-nav-bar  
      title="地图"
      left-arrow
      @click-left="goBack"
    />
  	<div class="map-box">
      <div class="coordinate">
        <van-field
          label="当前经纬度"
          disabled :value="latlngStr"
        />
        <van-button type="info" @click="selectLngLat" :disabled="$route.path.includes('/view_map')">确定坐标</van-button>
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
        return this.lng.toFixed(3) + ', ' + this.lat.toFixed(3);
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
        let map = new BMap.Map('allmap');
        let point = new BMap.Point(this.lng, this.lat);
				map.centerAndZoom(point, 17);
				map.addControl(new BMap.MapTypeControl({
					mapTypes: [
						BMAP_NORMAL_MAP,
						BMAP_HYBRID_MAP
					]
				}));
				map.setCurrentCity("福州");
				map.enableScrollWheelZoom(true);
				let marker =new BMap.Marker(point)// 创建标注
				map.addOverlay(marker)// 将标注添加到地图中

				map.addEventListener("click", (e)=>{
          if(this.$route.path.includes('/choose_map')){
            map.clearOverlays(marker);
            marker = new BMap.Marker(e.point)// 创建标注
            map.addOverlay(marker)// 将标注添加到地图中
            this.lng = e.point.lng;
            this.lat = e.point.lat;
          }
				});
				// 触摸移动时触发此事件 此时开启可以拖动。虽然刚初始化该地图不可以拖动，但是可以触发拖动事件。
				map.addEventListener("touchmove", (e) => {
				  map.enableDragging();
				});
				// 触摸结束时触发次此事件  此时开启禁止拖动
				map.addEventListener("touchend", (e) => {
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

@navbar: 46px; 
@inputHeight: 15%; 

#mapShow{
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  position: relative;

  .van-nav-bar {
    z-index: 99;
    background: #f5f5f5;
    border-bottom: 1px solid #D4D4D4;
  }

  .map-box{
    height: ~"calc(90% - (@{navbar}))";
    width: 100%;

    .coordinate{
      margin: 1rem auto 0;
      width: 90%;
      height: @inputHeight;
      display: flex;
      align-items: center;

      .van-field{
        width: 70%;
      }

      button{
        width: 28%;
        background: rgb(2, 167, 240);
        border: none;
      }
    }

    #allmap{
      margin: .5rem auto;
      width: 90%;
      height: ~"calc(100% - (@{inputHeight}) - 3rem)";
    }
  }
}
</style>
