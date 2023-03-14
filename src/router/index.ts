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
			path: '/searchResult',
			name: 'searchResult',
			component: () => import('@/views/search/searchResult.vue')
		}
	]
})

export default router
