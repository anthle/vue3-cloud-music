<script setup lang="tsx">
import { ref, watch, computed, type CSSProperties, type VNodeChild } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import LoginModal, { type LoginModalExpose } from './LoginModal.vue'
import { List, SparklesOutline, VideocamOutline, StarOutline, Heart } from '@vicons/ionicons5'
import { NIcon, useLoadingBar } from 'naive-ui'
import { BackToTop, Music, User } from '@vicons/carbon'
import { useMainStore } from '@/stores/main'

interface childrenMenuOptionItem extends MenuOptionItem {
	id: number
}

type MenuOptionItem = {
	label: (() => VNodeChild) | string
	key: string
	icon?: () => VNodeChild
	children?: childrenMenuOptionItem[]
}
const route = useRoute()
const mainStore = useMainStore()

let hiddenLeftMenu = ref(false)
let collapsed = ref(false)
let activeKey = ref<string | null>('')
const loginModalRef = ref<LoginModalExpose>()

watch(
	() => route.path,
	(newVal) => {
		activeKey.value = newVal
		if (route.meta.hidden) {
			hiddenLeftMenu.value = true
		} else {
			hiddenLeftMenu.value = false
		}
	}
)

// 菜单栏
const menuOptions = [
	{
		label: () => <RouterLink to="/discovery">发现音乐</RouterLink>,
		key: '/discovery',
		icon: () => <NIcon component={SparklesOutline} />
	},
	{
		label: () => <RouterLink to="/songList">推荐歌单</RouterLink>,
		key: '/songList',
		icon: () => <NIcon component={List} />
	},
	{
		label: () => <RouterLink to="/latestMusic">最新音乐</RouterLink>,
		key: '/latestMusic',
		icon: () => <NIcon component={Music} />
	},
	{
		label: () => <RouterLink to="/latestMv">最新MV</RouterLink>,
		key: '/latestMv',
		icon: () => <NIcon component={VideocamOutline} />
	}
]

// 未登录显示的菜单
const noLoginOption = {
	label: () => (
		<div class="flex items-center" onClick={handleOpenLoginModalClick}>
			<p>未登录</p>
		</div>
	),
	key: 'login',
	icon: () => <NIcon class="mr-2" size={20} component={User} />
}

const myMenuOptions = ref<MenuOptionItem[]>(menuOptions)

const mainStyle = computed<CSSProperties>(() => {
	return { height: route.meta.hidden ? '100%' : '800px' }
})

const handleOpenLoginModalClick = () => {
	loginModalRef.value?.show()
}
</script>

<template>
	<n-layout has-sider>
		<n-layout-sider
			v-show="!hiddenLeftMenu"
			border
			collapse-mode="width"
			:collapsed-width="64"
			:width="192"
			:style="mainStyle"
			:collapse="collapsed"
			show-trigger
			@collapse="collapsed = true"
			@expand="collapsed = false"
		>
			<n-menu
				v-model:value="activeKey"
				:collapsed="collapsed"
				:collapsed-width="64"
				:collapsed-icon-size="22"
				:options="myMenuOptions"
				:default-expand-all="true"
			></n-menu>
		</n-layout-sider>
		<login-modal ref="loginModalRef" />
		<n-back-top :right="mainStore.backTopLeft" :bottom="220" :visibility-height="800">
			<n-icon :component="BackToTop" />
		</n-back-top>
	</n-layout>
</template>

<style lang="scss" scoped>
.home {
	color: #000;
}
</style>
