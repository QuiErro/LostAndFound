webpackJsonp([6],{"2p5q":function(e,t){},"F/pk":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("Xxa5"),r=s.n(o),n=s("exGp"),a=s.n(n),i=s("Dd8w"),l=s.n(i),c=s("gyMJ"),d=s("NYxO"),u={name:"Login",data:function(){return{loginMode:!0,type:1,email:"",phone:"",password:"",student_id:"",userInfo:{}}},methods:l()({},Object(d.b)(["syncUserInfo"]),{goBack:function(){this.$router.go(-1)},login:function(){var e=this;return a()(r.a.mark(function t(){var s,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==e.type||e.$refs.emailInput.valid){t.next=4;break}e.$dialog.toast({mes:"邮箱"+e.$refs.emailInput.errorMsg,icon:"error",timeout:1e3}),t.next=25;break;case 4:if(1!==e.type||e.student_id){t.next=8;break}e.$dialog.toast({mes:"学号不得为空",icon:"none",timeout:1e3}),t.next=25;break;case 8:if(e.password){t.next=12;break}e.$dialog.toast({mes:"密码不得为空",icon:"none",timeout:1e3}),t.next=25;break;case 12:if(1!==e.type){t.next=19;break}return t.next=15,Object(c.p)({type:e.type,student_id:e.student_id,password:e.password});case 15:0===(s=t.sent).error_code?e.userInfo=s.data:e.$dialog.toast({mes:s.error_msg,icon:"error",timeout:1e3}),t.next=24;break;case 19:return t.next=21,Object(c.p)({type:e.type,email:e.email,password:e.password});case 21:o=t.sent,console.log(o),0===o.error_code?e.userInfo=o.data:e.$dialog.toast({mes:o.error_msg||"登录失败",icon:"error",timeout:1e3});case 24:e.userInfo.user_id&&(e.$dialog.toast({mes:"登录成功",icon:"success",timeout:1e3}),e.syncUserInfo(e.userInfo),e.$router.replace("/home"),e.email="",e.phone="",e.code=null,e.student_id="",e.password="");case 25:case"end":return t.stop()}},t,e)}))()},goReg:function(){this.$router.replace("/register")},dealLoginMode:function(e){this.loginMode=e,this.type=e?1:0}})},p={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"back-icon"},[s("span",{on:{click:e.goBack}},[s("i",{staticClass:"mui-icon mui-icon-back"})])]),e._v(" "),s("div",{staticClass:"login-title"},[e._v("欢迎使用失物招领平台")]),e._v(" "),s("div",{staticClass:"login-header"},[s("a",{class:{current:e.loginMode},attrs:{href:"javascript:;"},on:{click:function(t){return e.dealLoginMode(!0)}}},[e._v("学号登录")]),e._v(" "),s("a",{class:{current:!e.loginMode},attrs:{href:"javascript:;"},on:{click:function(t){return e.dealLoginMode(!1)}}},[e._v("邮箱登录")])]),e._v(" "),e.loginMode?s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"}),e._v(" "),s("yd-input",{attrs:{slot:"right",required:"",placeholder:"请输入学号",type:"number"},slot:"right",model:{value:e.student_id,callback:function(t){e.student_id=t},expression:"student_id"}})],1):s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"}),e._v(" "),s("yd-input",{ref:"emailInput",attrs:{slot:"right",required:"",debug:!0,regex:"email",placeholder:"请输入邮箱"},slot:"right",model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v(" "),s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"}),e._v(" "),s("yd-input",{attrs:{slot:"right",type:"password",placeholder:"请输入密码"},slot:"right",model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),s("div",{staticClass:"post-btn"},[s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:e.login}},[e._v("登录")])],1),e._v(" "),s("div",{staticClass:"goregister",on:{click:e.goReg}},[e._v("立即注册")])],1)},staticRenderFns:[]};var g=s("VU/8")(u,p,!1,function(e){s("2p5q")},"data-v-d860bc58",null);t.default=g.exports}});
//# sourceMappingURL=6.bc968807c7951bdb88ae.js.map