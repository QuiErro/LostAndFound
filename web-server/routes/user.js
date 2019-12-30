import express from 'express'
import User from './../models/User'
import md5 from 'blueimp-md5'
import formidable from 'formidable'
import svgCaptcha from 'svg-captcha'
import {basename} from 'path'
import config from './../src/config'

const router = express.Router({});
const S_KEY = '@WaLQ1314?.LqFtK.Com.#';

/*****************************数据接口API—start******************************/

/*
	一次性图形验证码
*/
router.get('/api/captcha', (req, res, next) => {
    // 生成随机验证码
    let tempCaptcha = svgCaptcha.create({
        color: true,
        noise: 3,
        ignoreChars: '0o1iIO',
        size: 4
    });

    // 保存
	req.session.captcha = tempCaptcha.text.toLocaleLowerCase();

    // 返回客户端
    res.type('svg');
    res.send(tempCaptcha.data);
});

/*
	学号和密码登录/自动注册
*/
router.post('/api/login', (req, res, next)=>{
	// 获取数据
	const sid = req.body.sid;
	const user_pwd = req.body.user_pwd;
	const captcha = req.body.captcha;

	if(captcha !== req.session.captcha){
		res.json({
			status: 1,
			result: {
				message:'验证码错误'
			}
		});
		return;
	}

	// 查询数据
	User.findOne({sid: sid}, (err, user)=>{
		if(err) return next(err);
		// 若用户存在
		if(user != null){
			// 判断密码
			const md5_user_pwd = md5(md5(user_pwd) + S_KEY);
			if(user.user_pwd === md5_user_pwd){
				// 登录成功，在session里保存token
				req.session.token = user._id;
				res.json({
				    status: 200,
				    result: {
					   token: user._id,
					   message: '登录成功',
					   data: {
						   sid: user.sid,
						   user_name: user.user_name,
						   avatar: user.avatar,
						   phone: user.phone,
						   e_mail: user.e_mail
					   }
				    }
				}); 
			}else{
				res.json({
				    status: 1,
				    result: {
						message: '密码错误'
					}
				});
			}
		}else{ // 新用户
			// 创建模型
			const user = new User({
				sid: req.body.sid,
				user_name: 'LFQ5ui' + Date.now(),
				user_pwd: md5(md5(req.body.user_pwd) + S_KEY),
			});

			// 保存   save() 若数据不存在，则新建；若_id已存在，更新数据
			user.save((err, user)=>{
				if(err) return next(err);
				// 登录成功，在session里保存token
				req.session.token = user._id;
				res.json({
				    status: 200,
				    result: {
					   token: user._id,
					   message: '登录成功',
					   data: {
						   sid: user.sid,
						   user_name: user.user_name,
						   avatar: user.avatar,
						   phone: user.phone,
						   e_mail: user.e_mail
					   }
				    }
				}); 
			});
		}
	});
});

/*
  退出登录
*/
router.get('/api/logout', (req, res, next)=>{
    // 销毁session
    // 方式1: 将cookie的时间设置为0，只有cookie中携带的信息通过客户端请求传到服务器，由对应的session接收,session才起作用，cookie没了session自然而然的将不起作用
    req.session.cookie.maxAge = 0;

    // 方式二: destroy
   /* req.session.destroy((err)=>{
        return next(err);
    });*/

    // 提示用户
    res.json({
       status: 200,
       result: {
		   message: '退出登录成功!'
	   }
    });
});

/* 
	根据session获取用户信息
 */
router.get('/api/user_self_msg', (req, res, next)=>{
	if(req.session.token){
		User.findById(req.session.token, '-_id -user_pwd', (err, user)=>{
			if(err) return next(err);
			if(user){
				res.json({
					status: 200,
					result: {
						data: user
					}
				});
			}
		});
	}else{
		res.json({
			status: 1,
			result: {
				message: '非法访问'
			}
		});
	}
	
});

/*
	获取某用户信息
*/
router.get('/api/user_msg', (req, res, next)=>{
	User.find({sid: req.query.sid}, '-_id -user_pwd', (err, user)=>{
		if(err) return next(err);
		if(user.length){
			res.json({
				status: 200,
				result: {
					data: user[0]
				}
			});
		}else{
			res.json({
				status: 1,
				result: {
					message: '用户不存在'
				}
			});
		}
	});
});

/*
	根据token修改用户头像
*/
router.post('/api/token/user_avatar_edit', (req, res, next) => {
	if(req.session.token){
		const form = new formidable.IncomingForm();
		form.uploadDir = config.uploadsPath;  // 上传图片放置的文件夹
		form.keepExtensions = true;   // 保存文件原始扩展名
		form.parse(req, (err, fields, files)=>{
			if(err) return next(err);
			
			// 1.根据token查询数据
			User.findById(req.session.token, (err, user)=>{
				if(err) return next(err);
				if(user != null){
					// 2.修改用户头像
					user.avatar = 'http://localhost:' + config.port + '/uploads/' + basename(files.avatar.path); // 取出图片名称
					// 3.保存   save() 若数据不存在，则新建；若_id已存在，更新数据
					user.save((err, user)=>{
						if(err) return next(err);
						res.json({
							status: 200,
							result: {
								message: '用户头像修改成功',
								data: {
									sid: user.sid,
									user_name: user.user_name,
									avatar: user.avatar,
									phone: user.phone,
									e_mail: user.e_mail
								}
							}
						});
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
	}else{
		res.json({
			status: 1,
			result: {
				message: '非法用户'
			}
		})
	}
});

/*
	根据token修改用户信息
*/
router.post('/api/token/user_edit', (req, res, next) => {
	if(req.session.token){
		const user_name = req.body.user_name || '';
		const phone = req.body.phone || '';
		const e_mail = req.body.e_mail || '';

		// 1.根据token查询数据
		User.findById(req.session.token, (err, user)=>{
			if(err) return next(err);

			if(user != null){
				// 2.修改用户数据
				// 用户名
				user.user_name = user_name ? user_name : user.user_name;
				// 手机号码
				user.phone = phone ? phone : user.phone;
				// 邮箱
				user.e_mail = e_mail ? e_mail : user.e_mail;
				
				// 3.保存   save() 若数据不存在，则新建；若_id已存在，更新数据
				user.save((err, user)=>{
					if(err) return next(err);
					res.json({
						status: 200,
						result: {
							message: '用户信息修改成功',
							data: {
								sid: user.sid,
								user_name: user.user_name,
								avatar: user.avatar,
								phone: user.phone,
								e_mail: user.e_mail
							}
						}
					});
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
	}else{
		res.json({
			status: 1,
			result: {
				message: '非法用户'
			}
		})
	}
});

/*
	根据token修改密码
*/
router.post('/api/token/reset_pwd', (req, res, next)=>{
	const token = req.session.token;
	const old_pwd = req.body.old_pwd;
	const new_pwd = req.body.new_pwd;
	
	User.findById(token, (err, user)=>{
		if(err) return next(err);
		
		if(user){
			const mds_old_pwd = md5(md5(old_pwd) + S_KEY);
			if(user.user_pwd !== mds_old_pwd){
				res.json({
					status: 1,
					result: {
						message: '密码不正确'
					}
				});
			}
			user.user_pwd = md5(md5(new_pwd) + S_KEY);
			
			user.save((err, result)=>{
				if(err) return next(err);
				res.json({
					status: 200,
					result: {
						message: '密码修改成功'
					}
				});
			});
		}else{
			res.json({
				status: 1,
				result: {
					message: '非法用户'
				}
			});
			req.session.cookie.maxAge = 0;
		}
	});
});

/*****************************数据接口API—end******************************/

export default router;