import {join} from 'path'

export default {
	viewsPath: join(__dirname, '../views'),
	publicPath: join(__dirname, '../public'),
	uploadsPath: join(__dirname, '../public/uploads'),
	port: parseInt(process.env.PORT, 10) || 3000,
	secret: 'www.com',
    name: 'nodeid',
    maxAge:  86400000,  // ms
    db_url:'mongodb://localhost:27017/lost_and_found'
}