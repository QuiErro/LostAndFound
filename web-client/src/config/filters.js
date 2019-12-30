import Vue from  'vue'
import moment from 'moment'

// 账号过滤器
Vue.filter('timeFormat', (time)=>{
  let newTime = moment(time).format('YYYY-MM-DD');
  
  return newTime;
});
