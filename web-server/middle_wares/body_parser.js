import querystring from 'querystring'

// 处理post请求
export default (req, res, next) => {
	// 1.过滤get请求
	if(req.method.toLowerCase() === 'get'){
		return next();
	}
	
	// 2.如果是普通的表单提交，要处理    application/x-www-form-urlencoded
	// 如果有文件（图片、音视频） 不处理    multipart/form-data
	// 如果是json,要处理
	if(req.headers['content-type'].startsWith('multipart/form-data')){
		return next();
	}
	
	// 3.处理 application/x-www-form-urlencoded  数据流拼接
	if(req.headers['content-type'].startsWith('application/x-www-form-urlencoded')){
		let data = '';
		req.on('data', (chunk)=>{
			data += chunk;
		})
		req.on('end', ()=>{
			req.body = querystring.parse(data);
			next();
		});
	}

	// 4. 处理 application/json
	if(req.headers['content-type'].startsWith('application/json')){
		let data = '';
		req.on('data', (chunk)=>{
			data += chunk;
		})
		req.on('end', ()=>{
			req.body = data;
			console.log(req.body)
			next();
		});
	}
	
}