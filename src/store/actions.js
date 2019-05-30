import Vue from 'vue'
import {
  getAllFound,
  getAllLost,
  getUser_lost,
  getUser_found,
  searchFound,
  searchLost
} from '../api'

import {
  USER_INFO,
  RESET_USER_INFO,
  CHANGE_SELECTED_MAP,
  LOST_CONTENT,
  FOUND_CONTENT,
  SELECTED_GOODS,
  USER_FOUND_CONTENT,
  USER_LOST_CONTENT,
  OTHER_USER_FOUND_CONTENT,
  OTHER_USER_LOST_CONTENT,
  SELECTED_FOUND_GOODS,
  SELECTED_LOST_GOODS,
  SELECTED_USERNAME,
  SEARCH_CONTENT,
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

  // 获取自己发表的失物招领
  async reqUserFoundPost({commit}, id) {
    const result_found = await getUser_found(id);
    commit(USER_FOUND_CONTENT, {userFoundContent: result_found.data})
  },
  // 获取自己发表的寻物启事
  async reqUserLostPost({commit}, id) {
    const result_lost = await getUser_lost(id);
    commit(USER_LOST_CONTENT, {userLostContent: result_lost.data})
  },

  // 获取其他用户发表的失物招领
  async reqOtherUserFoundPost({commit}, id) {
    const result_found = await getUser_found(id);
    commit(OTHER_USER_FOUND_CONTENT, {otheruserFoundContent: result_found.data})
  },
  // 获取其他用户发表的寻物启事
  async reqOtherUserLostPost({commit}, id) {
    const result_lost = await getUser_lost(id);
    commit(OTHER_USER_LOST_CONTENT, {otheruserLostContent: result_lost.data})
  },

  // 搜索寻物启事
  async reqSearchLostPost({commit}, params) {
    const result_lost = await searchLost(params);
    let goods = result_lost.data;
    goods.forEach(obj => {
      Vue.set(obj, 'event_type', 1);
    });
    commit(SEARCH_CONTENT, {searchContent: goods})
  },

  // 搜索失物招领
  async reqSearchFoundPost({commit}, params) {
    const result_found = await searchFound(params);
    let goods = result_found.data;
    goods.forEach(obj => {
      Vue.set(obj, 'event_type', 0);
    });
    commit(SEARCH_CONTENT, {searchContent: goods})
  },

  // 记录用户查看的失物物品
  synSeletedFoundGoods({commit}, goods){
    commit(SELECTED_FOUND_GOODS, {goods});
  },

  // 记录用户查看的寻物物品
  synSeletedLostGoods({commit}, goods){
    commit(SELECTED_LOST_GOODS, {goods});
  },

  // 记录查看的某用户的用户名
  synSeletedUserName({commit}, username){
    commit(SELECTED_USERNAME, {username});
  },
}
