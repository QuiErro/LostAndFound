export default (req, res, next)=>{
	// 若是后端接口相关 （需要token权限的接口）
	if(req.path.indexOf('/api/token/') !== -1){
		// 判断是否处于有效登录时效
		if(req.session.token){
			return next();
		}
		return next(new Error('非法访问！'));
	}
	
	// 其他
	return next();
}