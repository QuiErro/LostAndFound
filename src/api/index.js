import ajax from './ajax'

// const BASE_URL = '/api'; // 解决跨域
const BASE_URL = 'http://47.112.10.160:3389'; // 服务器真实地址

// 请求邮箱验证码
export const getEmailCode = (email) => ajax(BASE_URL + '/api/register_email_code', {email}, 'POST');

// 请求手机验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/register_phone_code', {phone}, 'POST');

// 邮箱验证码注册
export const emailCodeRegister = (type, email, code, student_id, password) => ajax(BASE_URL + '/api/register', {type, email, code, student_id, password}, 'POST');

// 手机验证码注册
export const phoneCodeRegister = (type, phone, code, student_id, password) => ajax(BASE_URL + '/api/register', {type, phone, code, student_id, password}, 'POST');

// 邮箱或学号登录
export const pwdLogin = (params) => ajax(BASE_URL + '/api/login', params, 'POST');

// 手机或学号登录
export const phonePwdLogin = (params) => ajax(BASE_URL + '/api/login', params, 'POST');

// 发表失物
export const postFound = (params) => ajax(BASE_URL + '/api/new_found', params, 'POST');

// 发表寻物
export const postLost = (params) => ajax(BASE_URL + '/api/new_lost', params, 'POST');

// 请求首页失物信息
export const getAllFound = () => ajax(BASE_URL + '/api/all_found');

// 请求首页寻物信息
export const getAllLost = () => ajax(BASE_URL + '/api/all_lost');

// 获取用户信息
export const getUserInfo = (id) => ajax(BASE_URL + '/api/user/' + id + '/info');

// 用户普通信息修改
export const userEdit = (username, student_id) => ajax(BASE_URL + '/api/user_edit', {username, student_id}, 'POST');

// 请求修改邮箱时的验证码
export const getEditEmailCode = (email) => ajax(BASE_URL + '/api/get_update_email_code', {email}, 'POST');

// 请求修改手机时的验证码
export const getEditPhoneCode = (phone) => ajax(BASE_URL + '/api/get_update_phone_code', {phone}, 'POST');

// 修改邮箱
export const emailChange = (email, code) => ajax(BASE_URL + '/api/update_email', {email, code}, 'POST');

// 修改手机
export const phoneChange = (phone, code) => ajax(BASE_URL + '/api/update_phone', {phone, code}, 'POST');

// 修改头像
export const photoChange = (params) => ajax(BASE_URL + '/api/update_photo', params, 'POST');

// 查看某用户发布过的信息  /api/user/(user_id)/all_found
export const getUser_found = (id) => ajax(BASE_URL + '/api/user/' + id + '/all_found');

// 查看某用户发布过的信息  /api/user/(user_id)/all_lost
export const getUser_lost = (id) => ajax(BASE_URL + '/api/user/' + id + '/all_lost');

// 开启信息
export const finishLost = (item_id) => ajax(BASE_URL + '/api/finish_lost', {item_id}, 'POST');

// 关闭信息
export const finishFound = (item_id) => ajax(BASE_URL + '/api/finish_found', {item_id}, 'POST');

// 查找失物
export const searchFound = (params) => ajax(BASE_URL + '/api/search_found', params, 'POST');

// 查找寻物
export const searchLost = (params) => ajax(BASE_URL + '/api/search_lost', params, 'POST');

// 获取月份未认领学生卡
export const getStudentCard = (year, month) => ajax(BASE_URL + '/api/student_card/' + year + '/' + month);
