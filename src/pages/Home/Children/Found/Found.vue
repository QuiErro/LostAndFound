<template>
  <yd-pullrefresh :callback="loadNewList" ref="pullrefreshDemo">
    <div id="prop-list">
      <div class="cards-collection" v-if="isShowCardCollection">
        <yd-slider autoplay="2000" speed="500">
            <yd-slider-item>
              <img src="./../../image/lunbo2.jpg">
            </yd-slider-item>
            <yd-slider-item>
              <img src="./../../image/lunbo3.jpg">
            </yd-slider-item>
        </yd-slider>
      </div>
      <div class="goods-list" v-if="showContent.length">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(obj, index) in showContent" :key="index">
            <a @click="goGoodsDetail(obj)">
              <img class="mui-media-object mui-pull-left" :src="obj.picture_b64" v-if="obj.picture_b64">
              <div class="mui-media-body">
                <h1>{{obj.name}}</h1>
                <p class='mui-ellipsis'>
                  <span>拾到时间：{{obj.time}}</span>
                  <span>拾到地点：{{obj.place}}</span>
                  <span class="post-time">{{obj.create_time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="showIftips" v-else>暂时没有任何物品</div>
    </div>
   </yd-pullrefresh>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "Found",
    data(){
      return{
        showContent: this.foundContent, // 首页要展示的内容
        isShowCardCollection: true, // 是否显示学生卡集合信息
      }
    },
    created(){
    if(this.$route.params.type === 'all'){
        this.showContent = this.foundContent;
        this.isShowCardCollection = true;
     }else if(this.$route.params.type === 'card'){
       this.showContent = this.found_card_content;
       this.isShowCardCollection = false;
     }else if(this.$route.params.type === 'common'){
        this.showContent = this.found_common_content;
        this.isShowCardCollection = false;
     }else{
        this.showContent = this.found_value_content;
        this.isShowCardCollection = false;
     }

    },
    watch:{
      $route(){
        if(this.$route.params.type === 'all'){
            this.showContent = this.foundContent;
            this.isShowCardCollection = true;
        }else if(this.$route.params.type === 'card'){
          this.showContent = this.found_card_content;
          this.isShowCardCollection = false;
        }else if(this.$route.params.type === 'common'){
            this.showContent = this.found_common_content;
            this.isShowCardCollection = false;
        }else{
            this.showContent = this.found_value_content;
            this.isShowCardCollection = false;
        }
      },
      foundContent(){
        if(this.$route.params.type === 'all'){
          this.showContent = this.foundContent;
        }
      }
    },
    computed:{
      ...mapState(['foundContent', 'found_card_content', 'found_common_content', 'found_value_content']),
    },
    methods:{
      ...mapActions(["synSeletedGoods",'reqFound']),
      // 下拉刷新
      loadNewList() {
        this.reqFound();
        setTimeout(()=>{
          this.$dialog.toast({
            mes: '已经更新到最新内容'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        }, 500);
      },
      goGoodsDetail(obj){
        this.$router.push('/foundgoods/' + obj.item_id);
        this.synSeletedGoods(obj);
      }
    },
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
#prop-list{
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .cards-collection{
    padding: 10px 16px;
    height: 160px;
    .yd-slider{
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-list{
    padding: 15px 10px;
    .mui-table-view:before{
      background: #ffffff !important;
    }
    .mui-table-view {
      background: #F5F5F5;
      .mui-table-view-cell:after{
        background: #ffffff;
      }
      li {
        margin: 0 5px 10px;
        background: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 10px;
        box-shadow: 2px 2px #cccccc;
        a{
          display: flex;
          flex-direction: row;
          justify-content: center;
          .mui-media-object.mui-pull-left{
            max-width: 45% !important;
            width: 35%;
            height: 30%;;
            margin-right: 20px;
          }
          .mui-media-body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            h1 {
              font-size: 14px;
            }
            .mui-ellipsis {
              font-size: 12px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .post-time{
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  .showIftips{
    color: #333;
    width: 100%;
    text-align: center;
    padding-top: 20px;

  }
}
</style>
