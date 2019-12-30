import express from 'express'
const router = express.Router({});
import CardCovers from './../models/CardCovers'

router.get('/', (req, res, next) => {
	res.render("index.html");
});

/*****************************数据接口API—start******************************/

/* 
	首页最近三月未认领学生卡封面
 */ 
router.get('/api/card_covers', (req, res, next) => {
	let month = new Date().getMonth() + 1;
	let lastMonth = (month - 1) !== 0 ? (month - 1) : 12;
	let prevMonth = (lastMonth - 1) !== 0 ? (lastMonth - 1) : 12;
	CardCovers.where("cover_month").in([prevMonth, lastMonth, month]).exec((err,covers) => {
		if(err) return next(err);
		if(covers && covers.length){
			res.json({
				status: 200, 
				result: { 
					data: covers,
					months: [prevMonth, lastMonth, month]
				}
			})
		}        
	});
});

/*****************************数据接口API—end******************************/

export default router;