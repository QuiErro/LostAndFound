<template>
  <div id="post">
    <!-- 顶部 Header 区域 -->
    <van-nav-bar
      title="发布"
      left-arrow
      @click-left="goBack"
    />
    <div class="post-message">
      <div class="post-cell-item">
        <h5><span><van-icon name="star" /></span><span>请选择发布类型</span></h5>
        <van-button size="small" :type="event_type ? 'default' : 'info' " @click="choiceType(0)">失物招领</van-button>
        <van-button size="small" :type="event_type ? 'info' : 'default' " @click="choiceType(1)">寻物启事</van-button>
      </div>
      <div class="post-cell-item">
        <h5><span><van-icon name="star" /></span><span>请输入物品名称</span></h5>
        <van-field
          v-model="goods_name"
          clearable
          placeholder="最多15字"
          maxlength="15"
        />
      </div>
      <div class="post-cell-item">
        <h5><span><van-icon name="star" /></span><span>请选择{{title}}时间（一个月之内有效）</span></h5>
        <van-button size="small" type="default" @click="showDatePicker = true;">{{time}}</van-button>
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
            type="date"
            @cancel="showDatePicker = false"
            @confirm="chooseDate"
          />
        </van-popup>
      </div>
      <div class="post-cell-item">
        <h5><span><van-icon name="star" /></span><span>请在地图上选择适当范围</span></h5>
        <van-button size="small" type="default" disabled>{{'当前位置: '+ latlngStr}}</van-button>
        <van-button size="small" type="default" @click="goMap">前往地图</van-button>
      </div>
      <div class="post-cell-item">
        <h5><span><van-icon name="star" /></span><span>请输入{{title}}物品的详细地点</span></h5>
        <van-field
          v-model="place"
          clearable
          placeholder="最多20字"
          maxlength="20"
        />
      </div>
      <div class="post-cell-item">
        <h5 class="horizon"><span><van-icon name="star" /></span><span>请选择物品类型</span></h5>
        <van-button size="small" type="default" @click="sheetVisible = true" class="xs-button">{{prop_type_title}}</van-button>
        <div v-if="prop_type === 0">
          <div class="post-cell-item">
            <h5><span><van-icon name="star" /></span><span>请输入校园卡姓名</span></h5>
            <van-field
              v-model="student_name"
              clearable
              placeholder="最多10字"
              maxlength="10"
            />
          </div>
          <div class="post-cell-item">
            <h5><span><van-icon name="star" /></span><span>请输入校园卡学号</span></h5>
            <van-field
              v-model="student_id"
              clearable
              type="number"
              placeholder="请输入9位学号"
              maxlength="9"
            />
          </div>
        </div>
      </div>
      <div class="post-cell-item">
        <h5 class="horizon"><span>请选择交接方式</span></h5>
        <van-button size="small" type="default" @click="sheetMethodVisible = true">{{contact_way}}</van-button>
        <div v-if="contact_way === '本人联系方式' ">
          <h5><span><van-icon name="star" /></span><span>请输入本人联系方式</span></h5>
          <van-field v-model="contact_detail" clearable/>
        </div>
      </div>
      <div class="post-cell-item">
        <h5><span>点击输入更多详细信息(非必填项)</span></h5>
        <van-field
          v-model="info"
          rows="1"
          clearable
          autosize
          maxlength="100"
          type="textarea"
          placeholder="最多填写100字"
        />
      </div>
      <div class="post-cell-item">
        <h5><span>上传物品图片</span><span class="picture-tips">可以选择是否上传图片哦！</span></h5>
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="3"
        />
        <p class="font14">图片(最多3张，还可上传<span v-text="3-fileList.length"></span>张)</p>
      </div>
      <van-button size="large" type="info" @click="post">提交</van-button>
    </div>
    <!--选择物品类型-->
    <van-action-sheet v-model="sheetVisible" :actions="actions" @select="onTypeSelect" />
    <!--选择交接方式-->
    <van-action-sheet v-model="sheetMethodVisible" :actions="methodsActions" @select="selectMethodPropType" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import {Toast} from 'vant'
  import {postFound, postLost} from './../../service/api/index';

  export default {
    name: "Post",
    data(){
      return{
        minDate: new Date(),
        maxDate: new Date(),
        showDatePicker: false,  // 是否显示日期选择器
        event_type: 0,  // 事件类型   0--失物  1--寻物
        title: '拾到',
        goods_name: '', // 物品名称
        place: '', // 详细地点
        student_name: '',  // 学生卡姓名
        student_id: '',  // 学生卡学号
        contact_detail: '', // 联系方式
        info: '', // 物品详细信息
        time: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(), // 捡到/丢失物品的时间
        sheetVisible: false, // 控制物品类型选择表
        sheetMethodVisible: false, // 控制联系方式选择表
        contact_way: '易班工作站',
        prop_type: 0,  // 物品类型  0--校园卡  1--普通物品  2--贵重物品
        prop_type_title: '校园卡',
        actions: [
          {name: '校园卡', value: 0},
          {name: '普通物品',value: 1},
          {name: '贵重物品', value: 2},
        ],
        methodsActions: [
          {name: '易班工作站'},
          {name: '本人联系方式'},
        ],
        fileList: [],   // 上传的图片
      }
    },
    methods: {
      // 修改物品类型
      onTypeSelect(item) {
        this.sheetVisible = false;
        this.prop_type = item.value;
        this.prop_type_title = item.name;
      },
      // 选择日期
      chooseDate(value){
        let date = new Date(value);
        this.time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.showDatePicker = false;
      },
      // 点击后退
      goBack() {
        this.$router.go(-1);
      },
      // 选择事件类型
      choiceType(flag){
        this.event_type = flag;
      },
      // 修改交接方式
      selectMethodPropType(item) {
        this.contact_way = item.name;
      },
      // 前往地图
      goMap(){
        this.$router.push('/choose_map');
      },
      // 发布
      async post(){
        if(!this.goods_name || !this.place || (this.prop_type === 0 && (!this.student_name || !this.student_id)) || (this.contact_way === '本人联系方式' && !this.contact_detail)){
          Toast.fail('请确认必填项是否填写完整');
        }else{
          let contactStr;
          if(this.contact_way === '本人联系方式'){
            contactStr = this.contact_detail;
          }else{
            contactStr = this.contact_way;
          }
          let postObj = new FormData();
          postObj.append("goods_type", this.prop_type);
          postObj.append("goods_name", this.goods_name);
          postObj.append("time", this.time);
          postObj.append("longitude", this.pick_longitude);
          postObj.append("latitude", this.pick_latitude);
          postObj.append("place", this.place);
          postObj.append("contact_way", contactStr);

          if(this.prop_type === 0){
            postObj.append("student_id", this.student_id);
            postObj.append("student_name", this.student_name);
          }
          if(this.info){
            postObj.append("info", this.info);
          }
          if(this.fileList.length){
            postObj.append("goods_image", this.fileList[0].file);
          }
          if(!this.event_type){
            // 失物
            const result = await postFound(postObj);
            if(result.status === 200){
              Toast.success('发布成功');

              this.goods_name = '';
              this.place = '';
              this.contact_detail = '';
              this.info = '';
              this.student_name = '';
              this.student_id = '';
              this.fileList = [];

              //this.reqLost();
              //this.reqFound();
            }else{
              Toast.fail('发布失败');
            }
          }else{
            // 寻物
            const result = await postLost(postObj);
            if(result.status === 200){
              Toast.success('发布成功');

              this.goods_name = '';
              this.place = '';
              this.contact_detail = '';
              this.info = '';
              this.student_name = '';
              this.student_id = '';
              this.fileList = [];
              //this.reqLost();
              //this.reqFound();
            }else{
              Toast.fail('发布失败');
            }
          }
        }
      },
    },
    computed: {
      ...mapState(['lnglat']),
      // 物品所处的经度
      pick_longitude(){
        return this.lnglat.lng;
      },
      // 物品所处的纬度
      pick_latitude(){
        return this.lnglat.lat;
      },
      latlngStr(){
        return this.lnglat.lng + ', ' + this.lnglat.lat;
      },
    },
    watch: {
      event_type(){
        this.title = this.event_type ? '丢失' : '拾到';
      },
    },
  }
</script>

<style scoped lang="less" ref="stylesheet/less">
 #post{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    position: relative;

    .van-button--info{
      background: #169BD5;
      border: 1px solid #169BD5;
    }

    .van-nav-bar {
       z-index: 99;
       background: #f5f5f5;
       border-bottom: 1px solid #D4D4D4;
    }

    .post-message{
      padding: 3rem 1rem;
      background: #f5f5f5;

      .post-cell-item{
        margin-bottom: 1.5rem;

        .van-button{
          margin-right: 2rem;
          border-radius: 1rem;
          
        }
        .van-button--info{
          background: #169BD5;
        }
        
        .van-field{
          display: flex;
          align-items: center;

          width: 95%;
          margin: 0 auto;
          font-size: 14px;
          background: transparent;
          border-bottom: 1px solid rgb(2, 167, 240);
        }
      
        h5{
          margin-bottom: 7px;
          span{
            color: #333;
            font-weight: bolder;
            font-size: 13px;

            i{
              color: #169BD5;
              font-size: 7px;
              display: inline-block;
              margin-right: 2px;
            }
          }
        }
        
        h5.horizon{
          display: inline-block;
          margin-right: 2rem;
        }

        .picture-tips{
          font-size: 12px;
          color: #aaa;
          display: inline-block;
          margin-left: 1rem;
        }
      }
    }
 }
</style>
