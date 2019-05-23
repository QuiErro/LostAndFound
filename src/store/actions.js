import {
  getAllFound,
  getAllLost,
} from '../api'

import {
  USER_INFO,
  RESET_USER_INFO,
  CHANGE_SELECTED_MAP,
  LOST_CONTENT,
  FOUND_CONTENT,
  SELECTED_GOODS,
} from './mutation-types'

export default {

  // 同步本地用户的信息
  syncUserInfo({commit}, userInfo){
    commit(USER_INFO, {userInfo});
  },

  // 退出--清空本地用户的信息
  logOut({commit}){
    commit(RESET_USER_INFO);
  },

  // 选择经纬度
  synLngLat({commit}, lnglat){
    commit(CHANGE_SELECTED_MAP, {lnglat});
  },

  // 记录用户查看的物品
  synSeletedGoods({commit}, goods){
    commit(SELECTED_GOODS, {goods});
  },

  // 获取首页的失物信息
  async reqFound({commit}) {
    const result = await getAllFound();
    commit(FOUND_CONTENT, {foundContent: result.data})
  },

  // 获取首页的寻物信息
  async reqLost({commit}) {
    const result = await getAllLost();
    commit(LOST_CONTENT, {lostContent: result.data})
  },
}
