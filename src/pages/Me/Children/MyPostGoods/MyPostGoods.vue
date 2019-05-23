<template>
  <div class="goods">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="物品名称">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="goods-content">
      <div class="post-img">
        <yd-lightbox>
          <yd-lightbox-img src="http://static.ydcss.com/uploads/lightbox/scenery_s05.jpg"></yd-lightbox-img>
        </yd-lightbox>
      </div>
      <div class="post-basic">
        <div><h4>物品名称:</h4><span>手机</span></div>
        <div><h4>物品分类:</h4><span>贵重物品</span></div>
        <div><h4>丢失地点:</h4><span>西三教学楼一楼附近</span></div>
        <div><h4>丢失方式:</h4><span>2019-06-01</span></div>
        <div><h4>交接方式:</h4><span>九号楼易班工作站</span></div>
      </div>
      <div class="post-detail">
        <h4>详细信息</h4>
        <div>暂无</div>
      </div>
      <div class="post-time"><span>发布时间：2019-06-01</span></div>
      <div class="post-btn"><mt-button type="primary" size="small" @click="sheetVisible = true">{{prop_type}}</mt-button></div>
    </div>
    <!--选择是否开启本条消息-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>

  export default {
    name: "Goods",
    data() {
      return {
        sheetVisible: false,
        prop_type: "开启",
        actions: [
          {name: '关闭', method: this.selectPropType},
          {name: '开启', method: this.selectPropType},
        ],
      }
    },
    mounted(){
    },
    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      // 修改是否开启
      selectPropType(props) {
        this.prop_type = props.name;
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
      .post-basic{
        margin: 10px 0;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 3px 3px #D4D4D4;
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
      .post-detail{
        padding: 10px;
        width: 100%;
        height: 25%;
        background: #fff;
        border-radius: 7px;
        box-shadow: 3px 3px #D4D4D4;
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
        color: #aaaaaa;
      }
      .post-btn{
        text-align: center;
        margin: 10px 0 ;
        .mint-button{
          border-radius: 5px;
          color: #333;
          background: rgba(2, 167, 240, 0.505882352941176);
          width: 120px;
        }
      }
    }
  }
</style>
