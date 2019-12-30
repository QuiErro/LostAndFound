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
  
  export default {
  
    [USER_INFO](state, {userInfo}) {
      state.userInfo = userInfo;
    },

    [OTHER_USER_INFO](state, {otherUserInfo}) {
      state.otherUserInfo = otherUserInfo;
    },

    [USER_LOGOUT](state, {}) {
      state.userInfo = {};
    },

    [CARD_COVERS](state, {cardCovers}) {
      state.cardCovers = cardCovers;
    },

    [LASTED_MONTHS](state, {lastedMonths}) {
      state.lastedMonths = lastedMonths;
    },

    [CHOOSE_MAP](state, {lnglat}) {
      state.lnglat = lnglat;
    },

    [STUDENTS_CARD](state, {studentsCard}){
      state.studentsCard = studentsCard;
    },

    [CUR_GOODS](state, {goods}){
      state.curGoods = goods;
    },
  
  }
  