<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { ref } from 'vue'
import type { AnyObject } from 'env'
import { useRouter } from 'vue-router'
import { ArrowForwardIosRound, ExitToAppRound } from '@vicons/material'
import { UserProfile } from '@vicons/carbon'
import { Moon, SunnySharp } from '@vicons/ionicons5'

const mainStore = useMainStore()
const showUserPopover = ref(true)
const userDetail = ref<AnyObject>()
const singBtnLoading = ref(false)
const router = useRouter()

const handleSignInClick = () => {
	console.log(123)
}
const handleInfoEditClick = () => {
	showUserPopover.value = false
	router.push('/userInfoEdit')
}
const handlePositiveClick = () => {
	console.log(123)
}
const handleThemeSwitchUpdateChange = () => {
	mainStore.toggleTheme()
}
</script>

<template>
	<n-layout-header bordered class="flex h-14 items-center justify-between px-4 sm:px-3">
		<div class="flex">
			<span class="truncate">奇妙音乐屋！</span>
			<layout-header-search />
		</div>

		<div class="flex items-center">
			<!-- 用户中心 -->

			<!-- mainStore.isLogin -->
			<div v-if="true">
				<!-- mainStore.userProfile -->
				<div v-if="true" class="flex items-center mr-2">
					<n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
					<n-popover :show="showUserPopover" tigger="click" style="padding: 0" display-directive="show">
						<template #trigger>
							<p
								class="pl-2 text-xs turncate opacity-80 hover:opacity-100 cursor-pointer w-30 trigger"
								@click="() => userDetail && showUserPopover != showUserPopover"
							>
								123
							</p>
						</template>
						<div ref="popoverContainerRef" style="width: 300px">
							<div class="flex justify-evenly py-4">
								<div class="flex flex-col items-center">
									<p class="text-lg font-bold">1</p>
									动态
								</div>
								<div>
									<p class="text-lg font-bold">2</p>
									关注
								</div>
								<div>
									<p class="text-lg font-bold">3</p>
									粉丝
								</div>
							</div>
							<div class="flex justify-center">
								<n-button
									:loading="singBtnLoading"
									:disabled="mainStore.userProfile.pcSign"
									round
									@click="handleSignInClick"
								>
									{{ mainStore.userProfile.pcSign ? '已签到' : ' 签到' }}</n-button
								>
							</div>
							<div class="mt-3 hover:bg-neutral-200/20 dark:border-gray-200/20 border-solid">
								<!-- 个人信息设置 -->
								<div class="flex justify-between items-center py-2 px-4 cursor-pointer" @click="handleInfoEditClick">
									<div class="flex items-center text-base">
										<n-icon :size="20" :component="UserProfile" />
										<span class="ml-2">个人信息设置</span>
									</div>
									<n-icon :component="ArrowForwardIosRound" />
								</div>
							</div>
							<div
								class="hover:bg-neutral-200/20 border-0 border-b border-gray-200 dark:border-gray-200/20 border-solid"
							>
								<n-popconfirm @positive-click="handlePositiveClick">
									<template #trigger>
										<div class="flex justify-between items-center py-2 px-4 cursor-pointer">
											<div class="flex items-center text-base">
												<n-icon :size="20" :component="ExitToAppRound" />
												<span class="ml-2">退出登录</span>
											</div>
											<n-icon :component="ArrowForwardIosRound" />
										</div>
									</template>
									确认退出登录吗？
								</n-popconfirm>
							</div>
						</div>
					</n-popover>
				</div>
				<!-- 用户加载骨架屏 -->
				<div v-else class="flex items-cneter mr-2">
					<n-skeleton width="30px" height="30px" round />
					<n-skeleton text style="width: 100px; margin-left: 8px" />
				</div>
			</div>
			<div class="flex items-center ml-2">
				<n-switch :value="mainStore.isActiveDarkTheme" size="large" :on-update:value="handleThemeSwitchUpdateChange">
					<template #checked-icon>
						<n-icon :component="Moon" />
					</template>
					<template #unchecked-icon> <n-icon :component="SunnySharp" /> </template
				></n-switch>
			</div>
		</div>
	</n-layout-header>
</template>

<style lang="scss" scoped>
.home {
	color: #000;
}
</style>
