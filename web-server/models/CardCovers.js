import mongoose from 'mongoose'

// 创建封面模型对象
const cardCoversSchema = mongoose.Schema({
	// 对应月份
	cover_month: {type: Number, required: true},
	// 封面
	cover_image: {type: String, required: true},
});

const CardCovers = mongoose.model('CardCovers', cardCoversSchema);

export default CardCovers;