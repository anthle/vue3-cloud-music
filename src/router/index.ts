import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/discovery',
			meta: { auth: false }
		},
		{
			path: '/discovery',
			name: 'discovery',
			component: () => import('@/views/home/DiscoveryView.vue'),
			meta: { auth: false }
		},
		{
			path: '/songList',
			name: 'songList',
			component: () => import('@/views/songList/RecommendSongListView.vue'),
			meta: { auth: false }
		},
		{
			path: '/latestMusic',
			name: 'latestMusic',
			component: () => import('@/views/music/LatestMusicView.vue'),
			meta: { auth: false }
		},
		{
			path: '/latestMv',
			name: 'latestMv',
			component: () => import('@/views/music/LatestMusicView.vue'),
			meta: { auth: false }
		},
		{
			path: '/searchResult',
			name: 'searchResult',
			component: () => import('@/views/search/searchResult.vue')
		}
	]
})

export default router
