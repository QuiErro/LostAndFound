import ajax from './ajax'


// 'http://47.112.10.160:3389';  // 服务器真实地址
 // const BASE_URL = '/api'; // 解决跨域


// 请求邮箱验证码
export const getEmailCode = (email) => ajax('/api/register_email_code', {email}, 'POST');

// 邮箱验证码注册
export const emailCodeRegister = (type, email, code, student_id, password) => ajax('/api/register', {type, email, code, student_id, password}, 'POST');

// 邮箱或手机登录
export const pwdLogin = (params) => ajax('/api/login', params, 'POST');

// 发表失物
export const postFound = (params) => ajax('/api/new_found', params, 'POST');

// 发表寻物
export const postLost = (params) => ajax('/api/new_lost', params, 'POST');

// 请求首页失物信息
export const getAllFound = () => ajax('/api/all_found');

// 请求首页寻物信息
export const getAllLost = () => ajax('/api/all_lost');

// 邮箱验证码注册
export const userEdit = (username, student_id) => ajax('/api/user_edit', {username, student_id}, 'POST');

// 请求修改邮箱时的验证码
export const getEditEmailCode = (email) => ajax('/api/get_update_email_code', {email}, 'POST');

// 修改邮箱
export const emailChange = (email, code) => ajax('/api/update_email', {email, code}, 'POST');

// 查看某用户发布过的信息  /api/user/(user_id)/all_found
export const getUser_found = (id) => ajax('/api/user/' + id + '/all_found');

// 查看某用户发布过的信息  /api/user/(user_id)/all_lost
export const getUser_lost = (id) => ajax('/api/user/' + id + '/all_lost');

// 开启信息
export const finishLost = (item_id) => ajax('/api/finish_lost', {item_id}, 'POST');

// 关闭信息
export const finishFound = (item_id) => ajax('/api/finish_found', {item_id}, 'POST');

// 查找失物
export const searchFound = (params) => ajax('/api/search_found', params, 'POST');

// 查找寻物
export const searchLost = (params) => ajax('/api/search_lost', params, 'POST');

