webpackJsonp([3],{qoju:function(t,e){},"uZe/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("Dd8w"),a=s.n(o),i=s("NYxO"),d={name:"LostGoods",data:function(){return{lat:0,lng:0,map:null,showImage:!0}},mounted:function(){this.lat=this.selected_goods.latitude,this.lng=this.selected_goods.longitude,this.baiduMap()},computed:a()({},Object(i.c)(["selected_goods","userInfo"])),watch:{$route:function(){this.$route.path.includes("/lostgoods")&&(this.selected_goods.picture&&(this.showImage=!0),this.lat=this.selected_goods.latitude,this.lng=this.selected_goods.longitude,this.map=null,this.baiduMap())}},methods:a()({},Object(i.b)(["reqOtherUserLostPost","reqOtherUserFoundPost","synSeletedUser"]),{goBack:function(){this.showImage=!1,this.$router.go(-1)},goUser:function(t){this.userInfo.user_id!==t.user_id?(this.reqOtherUserLostPost(t.user_id),this.reqOtherUserFoundPost(t.user_id),this.synSeletedUser(t),this.$router.push("/user/"+t.user_id)):this.$router.push("/me")},baiduMap:function(){this.map=new BMap.Map("allmap");var t=new BMap.Point(this.lng,this.lat);this.map.centerAndZoom(t,17),this.map.addControl(new BMap.MapTypeControl({mapTypes:[BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));var e=this;this.map.setCurrentCity("福州"),this.map.enableScrollWheelZoom(!0);var s=new BMap.Marker(t);this.map.addOverlay(s),this.map.addEventListener("touchmove",function(t){e.map.enableDragging()}),this.map.addEventListener("touchend",function(t){e.map.disableDragging()}),this.map.disableDragging()}})},n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"lostgoods"},[o("mt-header",{attrs:{fixed:"",title:t.selected_goods.name}},[o("span",{attrs:{slot:"left"},on:{click:t.goBack},slot:"left"},[o("mt-button",{attrs:{icon:"back"}})],1)]),t._v(" "),o("div",{staticClass:"goods-content"},[o("div",{staticClass:"post-user",on:{click:function(e){return t.goUser(t.selected_goods.creator)}}},[t.selected_goods.creator.photo?o("img",{attrs:{src:"http://47.112.10.160:3389/image/"+t.selected_goods.creator.photo}}):o("img",{attrs:{src:s("xkgh")}}),t._v(" "),o("span",[t._v(t._s(t.selected_goods.creator.username))])]),t._v(" "),t.showImage&&t.selected_goods.picture?o("div",{staticClass:"post-img"},[o("yd-slider",{attrs:{autoplay:"2500",speed:"1000"}},t._l(t.selected_goods.picture,function(t,e){return o("yd-slider-item",{key:e},[o("img",{attrs:{src:"http://47.112.10.160:3389/image/"+t}})])}),1)],1):t._e(),t._v(" "),o("div",{staticClass:"post-basic"},[o("div",[o("h4",[t._v("物品名称:")]),o("span",[t._v(t._s(t.selected_goods.name))])]),t._v(" "),t.selected_goods.student_id?o("div",[o("h4",[t._v("学号:")]),o("span",[t._v(t._s(t.selected_goods.student_id))])]):t._e(),t._v(" "),o("div",[o("h4",[t._v("丢失地点:")]),o("span",[t._v(t._s(t.selected_goods.place))])]),t._v(" "),o("div",[o("h4",[t._v("丢失时间:")]),o("span",[t._v(t._s(t.selected_goods.time))])]),t._v(" "),o("div",[o("h4",[t._v("交接方式:")]),o("span",[t._v(t._s(t.selected_goods.contact_way))])])]),t._v(" "),o("div",{attrs:{id:"allmap"}}),t._v(" "),o("div",{staticClass:"post-detail"},[o("h4",[t._v("详细信息")]),t._v(" "),o("div",[t._v(t._s(t.selected_goods.info))])]),t._v(" "),o("div",{staticClass:"post-time"},[o("span",[t._v("发布时间："+t._s(t.selected_goods.create_time))])]),t._v(" "),t.selected_goods.found?o("div",{staticClass:"post-btn"},[o("mt-button",{attrs:{type:"danger",size:"small",disabled:""}},[t._v("已关闭")])],1):t._e()])],1)},staticRenderFns:[]};var r=s("VU/8")(d,n,!1,function(t){s("qoju")},"data-v-34e57390",null);e.default=r.exports},xkgh:function(t,e,s){t.exports=s.p+"static/img/user.0ca0a25.jpg"}});
//# sourceMappingURL=3.3ab58aa319f1154d5319.js.map