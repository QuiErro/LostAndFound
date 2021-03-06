import mongoose from 'mongoose'
import config from './../src/config'

// 创建丢失的物品模型对象
const lostGoodsSchema = mongoose.Schema({
    // 物品类型：贵重物品--0/普通物品--1/学生卡--2
    goods_type: {type: Number, required: true},
	// 状态：是否找回
    state: {type: Number, default: 0},
    // 物品名称
    goods_name: {type: String, required: true},
    // 物品图片
    goods_image: {type: String, required: false},
    // 丢失时间
    time: {type: Date, default: Date.now},
    // 发布时间
    create_time: {type: Date, default: Date.now},
    // 丢失地点的纬度
    longitude: {type: Number, required: false},
    // 丢失地点的经度
    latitude: {type: Number, required: false},
    // 丢失地点
    place: {type: String, required: true},
    // 邮箱
    contact_way: {type: String, required: false},
    // 学生卡物品的学号
    student_id: {type: String, required: false},
    // 学生卡物品的学生姓名
    student_name: {type: String, required: false},
    // 物品详细信息
    info: {type: String, required: false},
    // 发布者的id
    user_id: {type: String, required: true},
    // 发布者的用户名
    user_name: {type: String, required: true},
    // 发布者的头像
    user_avatar: {type: String, default: 'http://localhost:' + config.port + '/images/user.jpg'},
});

const LostGoods = mongoose.model('LostGoods', lostGoodsSchema);

export default LostGoods;