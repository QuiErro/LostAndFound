import ajax from './ajax'

const BASE_URL = '/api'; // 解决跨域

// 学号登录
export const userLogin = (sid, user_pwd, captcha) => ajax(BASE_URL + '/api/login', {sid, user_pwd, captcha}, 'POST');
// 退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout');
// 获取某用户信息
export const getOtherUserInfo = (sid) => ajax(BASE_URL + '/api/user_msg', {sid});
// 获取用户信息
export const getUserInfo = () => ajax(BASE_URL + '/api/user_self_msg');
// 修改用户头像
export const editAvatar = (params) => ajax(BASE_URL + '/api/token/user_avatar_edit', params, 'POST');
// 修改用户信息
export const editUserInfo = (user_name, e_mail, phone) => ajax(BASE_URL + '/api/token/user_edit', {user_name, e_mail, phone}, 'POST');
// 获取首页未认领学生卡的封面
export const getCardCovers = () => ajax(BASE_URL + '/api/card_covers');
// 获取某月未认领学生卡
export const getFoundCards = (month) => ajax(BASE_URL + '/api/found_card', {month});
// 获取全部失物招领信息
export const getAllFound = () => ajax(BASE_URL + '/api/found_all_goods');
// 获取全部寻物启事信息
export const getAllLost = () => ajax(BASE_URL + '/api/lost_all_goods');
// 获取分类寻物启事信息
export const getCateLost = (goods_type = 1) => ajax(BASE_URL + '/api/lost_cate_goods', {goods_type});
// 获取分类失物招领信息
export const getCateFound = (goods_type = 1) => ajax(BASE_URL + '/api/found_cate_goods', {goods_type});
// 发布失物招领
export const postFound = (params) => ajax(BASE_URL + '/api/token/post_found', params, 'POST');
// 发布寻物启事
export const postLost = (params) => ajax(BASE_URL + '/api/token/post_lost', params, 'POST');
// 搜索失物招领信息
export const getFoundInfo = (keywords, goods_type) => ajax(BASE_URL + '/api/search_found', {keywords, goods_type});
// 搜索寻物启事信息
export const getLostInfo = (keywords, goods_type) => ajax(BASE_URL + '/api/search_lost', {keywords, goods_type});
// 查看某用户发布的失物招领
export const getUserFound = (sid) => ajax(BASE_URL + '/api/user_found_goods', {sid});
// 查看某用户发布的寻物启事
export const getUserLost = (sid) => ajax(BASE_URL + '/api/user_lost_goods', {sid});
// 关闭某条失物招领
export const closeFound = (goods_id) => ajax(BASE_URL + '/api/token/user_close_found', {goods_id}, 'POST');
// 关闭某条寻物启事
export const closeLost = (goods_id) => ajax(BASE_URL + '/api/token/user_close_lost', {goods_id}, 'POST');
