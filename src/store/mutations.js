import {
  USER_INFO,
  RESET_USER_INFO,
  CHANGE_SELECTED_MAP,
  FOUND_CONTENT,
  LOST_CONTENT,
  SELECTED_GOODS,
  USER_FOUND_CONTENT,
  USER_LOST_CONTENT,
  OTHER_USER_FOUND_CONTENT,
  OTHER_USER_LOST_CONTENT,
  SELECTED_LOST_GOODS,
  SELECTED_FOUND_GOODS,
  SELECTED_USERNAME,
  SEARCH_CONTENT,
} from './mutation-types'

export default {

  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [CHANGE_SELECTED_MAP](state, {lnglat}) {
    state.lnglat = lnglat;
  },

  [SELECTED_GOODS](state, {goods}) {
    state.selected_goods = goods;
  },

  [SELECTED_USERNAME](state, {username}) {
    state.otherusername = username;
  },

  [FOUND_CONTENT](state, {foundContent}) {
    let found_card_content = [];
    let found_common_content = [];
    let found_value_content = [];
   // foundContent.reverse();
    foundContent.forEach((obj)=>{
      if(obj.type === 0){
        found_card_content.push(obj);
      }else if(obj.type === 1){
        found_common_content.push(obj);
      }else{
        found_value_content.push(obj);
      }
    });
    state.foundContent = foundContent;
    state.found_card_content = found_card_content;
    state.found_common_content = found_common_content;
    state.found_value_content = found_value_content;
  },

  [LOST_CONTENT](state, {lostContent}) {
    let lost_card_content = [];
    let lost_common_content = [];
    let lost_value_content = [];
    //lostContent.reverse();
    lostContent.forEach((obj)=>{
      if(obj.type === 0){
        lost_card_content.push(obj);
      }else if(obj.type === 1){
        lost_common_content.push(obj);
      }else{
        lost_value_content.push(obj);
      }
    });
    state.lostContent = lostContent;
    state.lost_card_content = lost_card_content;
    state.lost_common_content = lost_common_content;
    state.lost_value_content = lost_value_content;
  },

  [USER_FOUND_CONTENT](state, {userFoundContent}) {
    state.userFoundContent = userFoundContent;
  },

  [USER_LOST_CONTENT](state, {userLostContent}) {
    state.userLostContent = userLostContent;
  },

  [OTHER_USER_FOUND_CONTENT](state, {otheruserFoundContent}) {
    state.otheruserFoundContent = otheruserFoundContent;
  },

  [OTHER_USER_LOST_CONTENT](state, {otheruserLostContent}) {
    state.otheruserLostContent = otheruserLostContent;
  },

  [SELECTED_LOST_GOODS](state, {goods}) {
    state.selected_lost_goods = goods;
  },

  [SELECTED_FOUND_GOODS](state, {goods}) {
    state.selected_found_goods = goods;
  },

  [SEARCH_CONTENT](state, {searchContent}) {
    state.searchContent = searchContent;
  },

}
