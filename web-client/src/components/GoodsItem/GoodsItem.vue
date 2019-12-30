<template>
  <div id="goods_item" @click="gotoMain" :class="{mask: goods.state}">
    <img class="goods_image" :src="goods.goods_image" v-if="goods.goods_image"/>
    <div class="goods_body">
        <h1>{{goods.goods_name + (!goods.goods_type ? goods.student_id : '')}}</h1>
        <p class="goods_info">
            <span>{{status === 'found' ? '拾到' : '丢失'}}时间：{{goods.time | timeFormat}}</span>
            <span>{{status === 'found' ? '拾到' : '丢失'}}地点：{{goods.place}}</span>
            <span class="post_time">{{goods.create_time | timeFormat}}</span>
        </p>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "GoodsItem",
    props: {
      goods: {
        type: Object,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapActions(['synCurGoods']),
      gotoMain(){
        let curGoods = {...this.goods, event_type: this.status};
        this.synCurGoods(curGoods);
        this.$router.push(`/goods/${this.goods._id}`)
      }
    }
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
#goods_item{
    margin: 0 auto 1rem;
    padding: .5rem;
    width: 96%;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 1rem;
    box-shadow: 1px 1px 4px #dfdfdf;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods_image{
        width: 9rem;
        height: 9rem;
    }
    
    .goods_body{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-between;
        
        h1 {
            padding-left: 5px;
            font-size: 20px;
            margin-bottom: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .goods_info {
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            padding-left: 5px;
            width: 100%;

            .post_time{
                text-align: right;
                font-size: 13px;
                color: rgba(143, 143, 148, 0.6);
            }
        }
    }
}
.mask{
  background: rgba(156, 156, 162, 0.1) !important;
  color: #b7b7b7 !important;
}
</style>
