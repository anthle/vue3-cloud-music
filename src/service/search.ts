import request from './request'

export function getHotSearchList() {
	return request.get('/search/hot/detail')
}

export function getDefaultSearchKeyword() {
	return request.get('/search/default')
}

export function getSuggestSearchList(keyword: string) {
	return request.get(`/search/suggest?keyword=${keyword}`)
}
