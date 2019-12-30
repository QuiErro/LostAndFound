import mongoose from 'mongoose'
import config from './../src/config'

// 创建用户模型对象
const userSchema = mongoose.Schema({
	// 学号
    sid: {type: String, required: true},
    // 用户名
    user_name: {type: String, required: true},
    // 密码
    user_pwd: {type: String, required: true},
    // 头像
    avatar: {type: String, default: 'http://localhost:' + config.port + '/images/user.jpg'},
    // 手机号码
    phone: {type: String, required: false},
    // 邮箱
    e_mail: {type: String, required: false},
});

const User = mongoose.model('User', userSchema);

export default User;