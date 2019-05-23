import ajax from './ajax'


// 'http://47.112.10.160:3389';  // 服务器真实地址
const BASE_URL = '/api'; // 解决跨域


// 请求邮箱验证码
export const getEmailCode = (email) => ajax(BASE_URL + '/api/auth_code', {email}, 'POST');

// 邮箱验证码注册
export const emailCodeRegister = (type, email, code, student_id, password) => ajax(BASE_URL + '/api/register', {type, email, code, student_id, password}, 'POST');

// 邮箱或手机登录
export const pwdLogin = (params) => ajax(BASE_URL + '/api/login', params, 'POST');

// 发表失物
export const postFound = (params) => ajax(BASE_URL + '/api/new_found', params, 'POST');

// 发表寻物
export const postLost = (params) => ajax(BASE_URL + '/api/new_lost', params, 'POST');

// 请求首页失物信息
export const getAllFound = () => ajax(BASE_URL + '/api/all_found');

// 请求首页寻物信息
export const getAllLost = () => ajax(BASE_URL + '/api/all_lost');
