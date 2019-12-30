import express from 'express'
import LostGoods from './../models/LostGoods'
import User from './../models/User'
import formidable from 'formidable'
import {basename} from 'path'
import config from './../src/config'

const router = express.Router({});

/*****************************数据接口API—start******************************/

/*
	发布寻物启事 （丢失物品）
*/
router.post('/api/token/post_lost', (req, res, next) => {
    const form = new formidable.IncomingForm();
	form.uploadDir = config.uploadsPath;  // 上传图片放置的文件夹
	form.keepExtensions = true;   // 保存文件原始扩展名
	form.parse(req, (err, fields, files)=>{
        if(err) return next(err);
        
        // 1.根据token查询用户数据
		User.findById(req.session.token, (err, user)=>{
			if(err) return next(err);

            if(user != null){
                // 2. 获取参数,创建模型
                const lostGoods = new LostGoods({
                    goods_name: fields.goods_name || '',
                    time: fields.time,
                    longitude: fields.longitude || 0,
                    latitude: fields.latitude || 0,
                    place: fields.place || '',
                    contact_way: fields.contact_way || '',
                    goods_image: 'http://localhost:' + config.port + '/uploads/' + basename(files.goods_image.path) || '',
                    student_id: fields.student_id || 0,
                    student_name: fields.student_name || '',
                    info: fields.info || '',
                    goods_type: fields.goods_type || 1,  // 默认普通物品
                    user_id: fields.sid,
                    user_name: fields.user_name,
                    user_avatar: fields.avatar
                });

                // 3.保存   save() 若数据不存在，则新建；若_id已存在，更新数据
                lostGoods.save((err, result)=>{
                    if(err) return next(err);
                    res.json({
                        status: 200,
                        result: {
                            message: '寻物启事发布成功'
                        }
                    })
                });
            }
            res.json({
                status: 1,
                result: {
                    message: '非法用户'
                }
            })
        });
	});
});

/*
    获取分类丢失物品信息 ————  分页  不含已找回的

router.get('/api/lost_cate_goods', (req, res, next) => {
    const goods_type = Number(req.query.goods_type) || 1;
    const pageNo = Number(req.query.pageNo) || 1;
    const pageSize = Number(req.query.pageSize) || 3;

    LostGoods.find({goods_type: goods_type, state: 0})
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .exec((err, doc) => {
            if(err) return next(err);
            res.json({
                status: 200,
                result: {
                    data: doc
                }
            })
        });
});
*/

/*
    获取分类丢失物品信息 ————  不含已找回的
*/
router.get('/api/lost_cate_goods', (req, res, next) => {
    const goods_type = Number(req.query.goods_type) || 1;

    LostGoods.find({goods_type: goods_type, state: 0}), (err, doc) => {
        if(err) return next(err);
        res.json({
            status: 200,
            result: {
                data: doc
            }
        })
    };
});

/*
    获取所有丢失物品信息 ————  分页  不含已找回的

router.get('/api/lost_all_goods', (req, res, next) => {
    const pageNo = Number(req.query.pageNo) || 1;
    const pageSize = Number(req.query.pageSize) || 3;

    LostGoods.find({state: 0})
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .exec((err, doc) => {
            if(err) return next(err);
            res.json({
                status: 200,
                result: {
                    data: doc
                }
            })
        });
});
*/

/*
    获取所有丢失物品信息 ————  不含已找回的
*/
router.get('/api/lost_all_goods', (req, res, next) => {

    LostGoods.find({state: 0}, (err, doc) => {
        if(err) return next(err);
        res.json({
            status: 200,
            result: {
                data: doc
            }
        })
    });
});

/*
    查看某用户发布的寻物启事（丢失物品） 分页

router.get('/api/user_lost_goods', (req, res, next) => {
    const user_id = req.query.user_id;
    const pageNo = req.query.pageNo;
    const pageSize = req.query.pageSize;

    LostGoods.find({user_id: user_id})
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .exec((err, doc) => {
            if(err) return next(err);
            res.json({
                status: 200,
                result: {
                    data: doc
                }
            })
        });
});
*/

/*
    查看某用户发布的寻物启事（丢失物品） 
*/
router.get('/api/user_lost_goods', (req, res, next) => {
    const sid = req.query.sid;

    LostGoods.find({user_id: sid}, (err, doc) => {
        if(err) return next(err);
        res.json({
            status: 200,
            result: {
                data: doc
            }
        })
    });
});

/*
    开启/关闭某条寻物启事
*/
router.post('/api/token/user_close_lost', (req, res, next) => {
    const token = req.session.token;
    const goods_id = req.body.goods_id;
     
    User.findById(token, (err, user)=>{
        if(err) return next(err);

        if(user != null){
            LostGoods.findById(goods_id, (err, goods)=>{
                if(err) return next(err);

                if(goods != null){
                    goods.state = !goods.state;
                    goods.save((err, goods)=>{
                        if(err) return next(err);
                        res.json({
                            status: 200,
                            result: {
                                message: goods.state ? '成功关闭' : '成功开启'
                            }
                        });
                        return;
                    });		
                }else{
                    res.json({
                        status: 1,
                        result: {
                            message: '物品不存在'
                        }
                    })
                }
            }); 
        }else{
            res.json({
                status: 1,
                result: {
                    message: '非法用户'
                }
            })
        }
    });
});

/*
    搜索寻物启事 模糊搜索  物品名称
*/
router.get('/api/search_lost', (req, res, next) => {
    let keywords = req.query.keywords;
	keywords = keywords.replace(/\s+/g, ' ');
	keywords = keywords.replace(/(^\s*)|(\s*$)/g, '');
    let keyArr = keywords.split(' ');
    let keyword = keyArr[0];
    const pageNo = req.query.pageNo;
    const pageSize = req.query.pageSize;

    LostGoods.find({goods_name: {$regex: keyword}})
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize)
        .exec((err, doc) => {
            if(err) return next(err);
            res.json({
                status: 200,
                result: {
                    data: doc
                }
            })
        });
});

/*****************************数据接口API—end******************************/

export default router;