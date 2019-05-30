<template>
  <div id="post">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="发布">
      <span slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="post-message">
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请选择发布类型</span></h5>
        <mt-button size="small" :type="event_type ? 'default' : 'primary' " @click="choiceType(0)">失物招领</mt-button>
        <mt-button size="small" :type="event_type ? 'primary' : 'default' " @click="choiceType(1)">寻物启事</mt-button>
      </div>
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请输入物品名称</span></h5>
        <yd-input required v-model="goods_name" max="15" placeholder="最多15字"></yd-input>
      </div>
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请选择{{title}}时间（一个月之内有效）</span></h5>
        <yd-datetime type="date"  :start-date="start_date" :end-date="end_date" v-model="pick_time" ></yd-datetime>
      </div>
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请在地图上选择适当范围</span></h5>
        <mt-button size="small" type="default" class="xs-button no-margin" v-text="'当前位置: '+ latlngStr" disabled></mt-button>
        <mt-button size="small" type="default" class="xs-button" @click="goMap" >查看地图</mt-button>
      </div>
      <div class="post-cell-item">
        <h5><span><i class="yd-icon-star"></i></span><span>请输入{{title}}物品的详细地点</span></h5>
        <yd-input required v-model="pick_place" max="20" placeholder="最多20字"></yd-input>
      </div>
      <div class="post-cell-item">
        <h5 class="horizon"><span><i class="yd-icon-star"></i></span><span>请选择物品类型</span></h5>
        <mt-button type="default" size="small" @click="sheetVisible = true" class="xs-button">{{prop_type_title}}</mt-button>
        <div v-if="prop_type === 0">
          <h5><span><i class="yd-icon-star"></i></span><span>请输入校园卡姓名</span></h5>
          <yd-input required v-model="school_card_name" max="10" placeholder="最多10字"></yd-input>
          <h5><span><i class="yd-icon-star"></i></span><span>请输入校园卡学号</span></h5>
          <yd-input required v-model="school_card_id" max="9" type="number" placeholder="输入9位学号"></yd-input>
        </div>
      </div>
      <div class="post-cell-item">
        <h5 class="horizon"><span>请选择交接方式</span></h5>
        <mt-button type="default" size="small" class="xs-button" @click="sheetMethodVisible = true">{{contact_way}}</mt-button>
        <div v-if="contact_way === '本人联系方式' ">
          <h5><span><i class="yd-icon-star"></i></span><span>请输入本人联系方式</span></h5>
          <yd-input required v-model="contact_detail"></yd-input>
        </div>
      </div>
      <div class="post-cell-item">
        <h5><span>点击输入更多详细信息(非必填项)</span></h5>
        <yd-textarea placeholder="最多填写100字" maxlength="100" v-model="info"></yd-textarea>
      </div>
      <div class="post-cell-item">
        <h5><span>上传物品图片</span></h5>
        <input @change="fileChange($event)" type="file" id="upload_file" name="picture" style="display: none" ref="file"/>
        <div class="add" @click="chooseType">
          <div class="add-image" align="center">
            <i class="mui-icon mui-icon-camera"></i>
            <p class="font13">添加图片</p>
          </div>
        </div>
        <span class="picture-tips">可以选择是否上传图片哦！</span>
        <div class="add-img" v-show="imgList.length">
          <p class="font14">图片(最多1张，还可上传<span v-text="1-imgList.length"></span>张)</p>
          <ul class="img-list">
            <li v-for="(url,index) in imgList" :key="index">
              <img class="del" src="./../../common/img/delete.png" @click.stop="delImg(index)"/>
              <yd-lightbox>
                <div class="app-bg">
                  <yd-lightbox-img class="app-bg" :src="url.file.src"></yd-lightbox-img>
                </div>
              </yd-lightbox>
            </li>
          </ul>
        </div>
      </div>
      <mt-button type="primary" size="large" @click="post">提交</mt-button>
    </div>
    <!--选择物品类型-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择交接方式-->
    <mt-actionsheet
      :actions="methodsActions"
      v-model="sheetMethodVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';
  import {postFound, postLost} from './../../api/index';

  export default {
    name: "Post",
    data(){
      return{
        event_type: 0,  // 事件类型   0--失物  1--寻物
        title: '拾到',
        goods_name: '', // 物品名称
        pick_place: '', // 详细地点
        school_card_name: '',  // 学生卡姓名
        school_card_id: '',  // 学生卡学号
        contact_detail: '', // 联系方式
        info: '', // 物品详细信息
        pick_time: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(), // 捡到/丢失物品的时间
        sheetVisible: false, // 控制物品类型选择表
        sheetMethodVisible: false, // 控制联系方式选择表
        contact_way: '易班工作站',
        prop_type: 0,  // 物品类型  0--校园卡  1--普通物品  2--贵重物品
        prop_type_title: '校园卡',
        actions: [
          {name: '校园卡', method: this.selectPropType, value: 0},
          {name: '普通物品', method: this.selectPropType, value: 1},
          {name: '贵重物品', method: this.selectPropType, value: 2},
        ],
        methodsActions: [
          {name: '易班工作站', method: this.selectMethodPropType},
          {name: '本人联系方式', method: this.selectMethodPropType},
        ],
        showFace: false,
        imgList: [],
        size: 0,
        limit:1, //限制图片上传的数量
        tempImgs:[],
        picture_b64: '',  // 图片base64编码
      }
    },
    methods: {
      ...mapActions(['synLngLat','reqFound', 'reqLost']), // 同步本地存储的用户选择的经纬度
      goBack() {
        // 点击后退
        this.$router.go(-1);
      },
      // 选择事件类型
      choiceType(flag){
        this.event_type = flag;
      },
       // 修改物品类型
      selectPropType(props) {
        this.prop_type = props.value;
        this.prop_type_title = props.name;
      },
      // 修改交接方式
      selectMethodPropType(props) {
        this.contact_way = props.name;
      },
      goMap(){
        this.$router.push('/choosemap');
      },
      chooseType() {
        document.getElementById('upload_file').click();
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
           }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
         }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
               _this.folders(file[i]);
            }
          }
        });
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
           _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          this.$dialog.toast({mes: '请选择图片文件'});
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
						this.postSrc = file.src;
            image.onload = function(){
              let width = image.width;
              let height = image.height;
              file.width = width;
              file.height = height;
              _this.imgList.push({
                file
              });
            };
            image.src= file.src;
            _this.picture_b64 = file.src;
          }
        }
      },
      delImg(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        if (this.limit !== undefined) this.limit = 1-this.imgList.length;
      },
      async post(){
        if(!this.goods_name || !this.pick_place || (this.prop_type === 0 && (!this.school_card_name || !this.school_card_id)) || (this.contact_way === '本人联系方式' && !this.contact_detail)){
          this.$dialog.toast({
            mes: '请确认必填项不为空',
            icon: 'error',
            timeout: 1000
          });
        }else{
          let contactStr;
          if(this.contact_way === '本人联系方式'){
            contactStr = this.contact_detail;
          }else{
            contactStr = this.contact_way;
          }
          let postObj = {
            type: this.prop_type,
            name: this.goods_name,
            time: this.pick_time,
            longitude: this.pick_longitude,
            latitude: this.pick_latitude,
            place: this.pick_place,
            contact_way: contactStr,
          };
          if(this.prop_type === 0){
            postObj.student_id = this.school_card_id; // 缺姓名
            postObj.student_name = this.school_card_name; // 缺姓名
          }
          if(this.picture_b64){
            postObj.picture_b64 = this.picture_b64;
          }
          if(this.info){
            postObj.info = this.info;
          }
          if(!this.event_type){
            // 失物
            const result = await postFound(postObj);
            if(result.error_code === 0){
              this.$dialog.toast({
                mes: '发表成功',
                icon: 'success',
                timeout: 1000
              });
              this.goods_name = '';
              this.pick_place = '';
              this.contact_detail = '';
              this.picture_b64 = '';
              this.info = '';
              this.school_card_name = '';
              this.school_card_id = '';
              this.imgList.length = 0;
              this.limit = 1;

              this.reqLost();
              this.reqFound();
            }else{
              this.$dialog.toast({
                mes: '发表失败',
                icon: 'error',
                timeout: 1000
              });
            }
          }else{
            // 寻物
            const result = await postLost(postObj);
            if(result.error_code === 0){
              this.$dialog.toast({
                mes: '发表成功',
                icon: 'success',
                timeout: 1000
              });
              this.goods_name = '';
              this.pick_place = '';
              this.contact_detail = '';
              this.picture_b64 = '';
              this.info = '';
              this.school_card_name = '';
              this.school_card_id = '';
              this.imgList.length = 0;
              this.reqLost();
              this.reqFound();
            }else{
              this.$dialog.toast({
                mes: '发表失败',
                icon: 'error',
                timeout: 1000
              });
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
      // 选择日期的开始时间
      start_date(){
        let date = new Date();
        date.setDate(date.getDate() - 30);
        let str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        return str;
      },
      // 选择日期的结束时间
      end_date(){
        let date = new Date();
        let str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        return str;
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
    .mint-header {
       z-index: 99;
       background: #f5f5f5;
       height: 40px;
       color: #000;
       font-weight: bolder;
       font-size: 18px;
       border-bottom: 1px solid #D4D4D4;
    }
    .post-message{
      padding: 50px 10px;
      background: #f5f5f5;
      .mint-button--large{
        border-radius: 10px;
        color: #333;
        font-weight: 900;
      }
      .post-cell-item{
        margin-bottom: 10px;
        .mint-button{
          margin-right: 15px;
          background: #fff;
          border-radius: 7px;
        }
        .mint-button--primary{
          background: #169BD5;
        }
        .yd-input{
          display: flex;
          align-items: center;
        }
        .yd-datetime-input{
          background: #fff;
          width: 40%;
          margin: 0 auto;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .yd-textarea{
          padding: 0;
          border-radius: 10px;
          box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
        }
        h5{
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
          margin-right: 20px;
        }
        .mint-button.xs-button{
          height: 28px;
          font-size: 12px;
        }
        .mint-button.xs-button.no-margin{
          margin-right: 5px;
          border-radius: 0%;
        }
        .app-bg  img{
            width: 100%;
            height: 100%;
            -webkit-transform: scale(1.03);
            -moz-transform: scale(1.03);
            -ms-transform: scale(1.03);
            -o-transform: scale(1.03);
            transform: scale(1.03);
        }
        textarea {
            padding: 10px;
        }

        .text-length {
            font-size: 14px;
            z-index: 999;
            width: 100%;
            text-align: right;
            margin-bottom: 10px;
            color: #e4e4e4;
        }

        .warning {
            color: #fe9900;
        }

        .add-img {
            width: 100%;
            padding: 10px;
        }

        .add-img p {
            color: #999;
        }

        .mui-content {
            padding-bottom: 60px;
        }

        .mui-content .idea {
            margin-top: 8px;
            background-color: #FFFFFF;
        }

        .good-item {
            text-align: center;
            width: 33%;
            max-width: 100%;
            overflow: hidden;
            padding-right: 10px;
            padding-bottom: 10px;
            float: left;
        }

        .good-item span {
            font-size: 15px;
            height: 30px;
            line-height: 30px;
            border-radius: 50px;
            display: block;
            width: 100%;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border: 1px solid #CCCCCC;
        }

        .mui-table {
            padding-top: 10px;
            color: #333;
            padding-left: calc(0.5% + 10px);
        }

        .h-line-behind {
            line-height: 40px;
            padding-left: 10px;
        }

        .question {
            border: 0;
            margin-bottom: 10px;
        }
        .picture-tips{
          font-size: 12px;
          color: #aaa;
          display: inline-block;
          margin-left: 10px;
        }
        .add {
            display: inline-block;
            margin-bottom: 20px;
        }

        .add-image {
            padding-top: 15px;
            margin-left: 10px;
            width: 80px;
            top: 20px;
            height: 80px;
            border: 1px dashed rgba(0, 0, 0, .2);
        }

        .add-image .icon-camera {
            font-size: 24px;
        }

        .good-item .choose {
            color: #fff;
            background-color: #87582E;
            color: #FFF;
            border: 0;
        }

        .mui-btn-block {
            border: 0;
            border-radius: 0;
            background-color: #87582E;
            color: #fff;
            margin-bottom: 0;
            bottom: 0;
        }

        .mui-buttom {
            position: fixed;
            width: 100%;
            bottom: 0;
            z-index: 999;

        }

        /*九宫格*/
        .img-list {
            overflow: hidden;
        }

        .img-list > li {
            float: left;
            width: 32%;
            text-align: center;
            padding-top: 31%;
            margin-left: 1%;
            margin-top: 1%;
            position: relative;
        }

        .img-list > li > div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .img-list > li > div .app-bg {
            width: 100%;
            height: 100%;
        }

        .mui-fullscreen {
            z-index: 9999;
        }

        .del {
            position: absolute;
            width: 18px;
            top: 0;
            right: 0;
            z-index: 999
        }
      }
    }
 }
</style>
