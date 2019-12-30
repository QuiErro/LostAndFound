import {
  getCardCovers,
  getLogOut,
  getOtherUserInfo
} from '../service/api/index'

import {
  USER_INFO,
  CARD_COVERS,
  CHOOSE_MAP,
  LASTED_MONTHS,
  STUDENTS_CARD,
  USER_LOGOUT,
  CUR_GOODS,
  OTHER_USER_INFO
} from './mutations-type'

import { setStore, removeStore } from './../config/global'

export default {

  // 保存用户信息
  synUserInfo({commit}, {userInfo}){
    commit(USER_INFO, {userInfo});
    setStore('token', userInfo);
  },

  // 选择经纬度
  synLngLat({commit}, lnglat){
    commit(CHOOSE_MAP, {lnglat});
  },

  // 同步未认领学生卡集合
  synStudentsCard({commit}, studentsCard){
    commit(STUDENTS_CARD, {studentsCard});
  },

  // 同步选中的物品
  synCurGoods({commit}, goods){
    commit(CUR_GOODS, {goods});
  },

  // 获取其他用户信息
  async getOtherUserInfo({commit}, sid){
    const res = await getOtherUserInfo(sid);
    if(res.status === 200){
      commit(OTHER_USER_INFO, {otherUserInfo: res.result.data});
    }
  },

  // 获取未认领学生卡的月封面
  async reqCardCovers({commit}){
    const res = await getCardCovers();
    if(res.status === 200){
      commit(CARD_COVERS, {cardCovers: res.result.data});
      commit(LASTED_MONTHS, {lastedMonths: res.result.months});
    }
  },

  async reqLogOut({commit}){
    const res = await getLogOut();
    if(res.status === 200){
      removeStore('token');
      commit(USER_LOGOUT, {});
    }
  },
}
