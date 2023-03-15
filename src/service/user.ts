import request from './request'

// 获取账号信息
export function getUserInfo() {
	return request.get('/user/account')
}

// 获取用户详情
export function getUserDetail(uid: string) {
	return request.get('/user/detail?uid=' + uid)
}

// 签到
export function signIn() {
	return request.post('/daily_signin?timestamp=' + Date.now() + '&type=1')
}
