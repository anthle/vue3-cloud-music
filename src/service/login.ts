import request from './request'

// 二维码key 生成接口
export function getQrCode() {
	return request.get('/login/qr/key?timestamp=' + new Date().getTime())
}

export function getQrCodeImg(key: string) {
	return request.get(`/login/qr/create?key=${key}&timestamp=${new Date().getTime()}&qrimg=true`)
}

export function getQrCodeStatue(key: string) {
	return request.get(`/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`)
}
