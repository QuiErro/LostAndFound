<template>
  <div id="prop-list">
    <div class="cards-collection" v-if="isShowCardCollection">
      <yd-slider autoplay="3000" speed="1000">
          <yd-slider-item v-for="index in 3" :key="index">
            <img :src='"./../../image/" + images[index - 1] + ".png"' @click="goStudentCard(index)">
          </yd-slider-item>
      </yd-slider>
    </div>
    <yd-pullrefresh :callback="loadNewList" ref="pullrefreshDemo">
      <div class="goods-list"  v-if="showContent.length">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(obj, index) in showContent" :key="index">
            <a @click="goGoodsDetail(obj)">
              <img class="mui-media-object mui-pull-left" :src="'http://47.112.10.160:3389/image/' + obj.picture[0]" v-if="obj.picture">
              <div class="mui-media-body">
                <h1>{{obj.name}}{{obj.student_id || ''}}</h1>
                <p class='mui-ellipsis'>
                  <span>丢失时间：{{obj.time}}</span>
                  <span>丢失地点：{{obj.place}}</span>
                  <span class="post-time">{{obj.create_time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="showIftips" v-else>暂时没有物品</div>
    </yd-pullrefresh>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex'

  export default {
    name: "Lost",
    data(){
      return{
        showContent: [], // 首页要展示的内容
        isShowCardCollection: true, // 是否显示学生卡集合信息
        images: [],
        month: null,
      }
    },
    created(){
      if(this.$route.params.type === 'all'){
        this.showContent = this.lostContent;
        this.isShowCardCollection = true;
      }else if(this.$route.params.type === 'card'){
       this.showContent = this.lost_card_content;
       this.isShowCardCollection = false;
      }else if(this.$route.params.type === 'common'){
        this.showContent = this.lost_common_content;
        this.isShowCardCollection = false;
      }else{
        this.showContent = this.lost_value_content;
        this.isShowCardCollection = false;
      }
      let month = new Date().getMonth() + 1;
      let preMonth = month - 1 <= 0 ? (month - 1 + 12) : (month - 1);
      let firstMonth = month - 2 <= 0 ? (month - 2 + 12) : (month - 2);
      this.images.push(firstMonth);
      this.images.push(preMonth);
      this.images.push(month);
    },
    watch:{
      $route(){
        if(this.$route.params.type === 'all'){
            this.showContent = this.lostContent;
            this.isShowCardCollection = true;
        }else if(this.$route.params.type === 'card'){
          this.showContent = this.lost_card_content;
          this.isShowCardCollection = false;
        }else if(this.$route.params.type === 'common'){
            this.showContent = this.lost_common_content;
            this.isShowCardCollection = false;
        }else{
            this.showContent = this.lost_value_content;
            this.isShowCardCollection = false;
        }
      },
      student_cards(){
        if(this.student_cards.length){
          this.$router.push('/studentscard');
        }else{
          this.$dialog.alert({mes: '本月没有未认领的学生卡哦！'});
        }
      },
    },
    computed:{
      ...mapState(['lostContent', 'lost_card_content', 'lost_common_content', 'lost_value_content', 'student_cards']),
    },
    methods:{
      ...mapActions(["synSeletedGoods",'reqLost','reqStudentCard', 'synSeletedMonth']),
      // 下拉刷新
      loadNewList() {
        this.reqLost();
        setTimeout(()=>{
          this.$dialog.toast({
            mes: '已经更新到最新内容'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        }, 500);
      },
      goGoodsDetail(obj){
        this.$router.push('/lostgoods/'+obj.item_id);
        this.synSeletedGoods(obj);
      },
      goStudentCard(index){
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1 + (index - 3);
        if(month <= 0){
          month += 12;
        }
        this.month = month;
        this.synSeletedMonth(this.month);
        this.reqStudentCard({year, month});
      }
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

  .cards-collection{
    padding: 10px 16px;
    height: 160px;
    .yd-slider{
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
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
        box-shadow: 1px 1px 4px #dfdfdf;
        a{
          display: flex;
          flex-direction: row;
          .mui-media-object.mui-pull-left{
            max-width: 32% !important;
            width: 32%;
            height: 30%;;
            margin-right: 20px;
          }
          .mui-media-body{
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            h1 {
              padding-left: 5px;
              font-size: 16px;
            }
            .mui-ellipsis {
              font-size: 13px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              padding-left: 5px;
              width: 100%;
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
