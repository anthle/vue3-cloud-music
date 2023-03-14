<script setup lang="ts">
import { ref, computed, type CSSProperties } from 'vue'
import { ArrowBackIosSharp, ArrowForwardIosRound } from '@vicons/material'
import { Search } from '@vicons/ionicons5'
import { Delete } from '@vicons/carbon'
import { useAsyncState } from '@vueuse/core'
import { getHotSearchList, getDefaultSearchKeyword, getSuggestSearchList } from '@/service/search'
import { useThemeVars } from 'naive-ui'
import { useMainStore } from '@/stores/main'
import { useRouter } from 'vue-router'

const defaultHeight = ref('100%')

const router = useRouter()

const spread = ref(false)

const showPopover = ref(false)

const { state: hotSearchList, isLoading: hotSearchLoading } = useAsyncState(
	getHotSearchList().then((res: any) => res.data.data),
	{}
)

const { state: defalutSearchKeyword } = useAsyncState(
	getDefaultSearchKeyword().then((res: any) => res.data.data),
	{}
)

// const { state: suggestResult, isLoading: suggestLoading, execute } = useAsyncState()

const themeVars = useThemeVars()

const mainStore = useMainStore()

const arrowIconClass = (value: string) => {
	return value ? 'opacity-100 cursor-pointer' : 'opacity-50'
}

const handleCheckAllClick = () => {
	if (defaultHeight.value === '100%') {
		return
	}
	spread.value = !spread.value
}

const historyListStyle = computed<CSSProperties>(() => {
	if (spread.value) {
		return { height: defaultHeight.value, overflow: 'visiblw' }
	}
	return {
		height: defaultHeight.value ? (parseInt(defaultHeight.value) >= 62 ? '62px' : '100%') : '100%',
		overflow: 'hidden'
	}
})

const toSearchResult = (val?: string) => {
	if (!mainStore.searchKeyword && defalutSearchKeyword.value.realkeyword && !val) {
		mainStore.searchKeyword = defalutSearchKeyword.value.realkeyword
	} else if (val) {
		mainStore.searchKeyword = val
	}
	mainStore.addSearchHistory(mainStore.searchKeyword)
	showPopover.value = false
	router.push({
		path: '/searchResult',
		query: { keyword: mainStore.searchKeyword }
	})
}
const handleClearClick = (e: MouseEvent, index: number) => {
	e.stopPropagation()
	mainStore.removeSearchHistory(index)
}
</script>

<template>
	<div class="flex items-center ml-8">
		<div class="text-base">
			<n-icon :class="[arrowIconClass('')]" :component="ArrowBackIosSharp"></n-icon>
		</div>
		<div class="ml-2 text-base">
			<n-icon :class="[arrowIconClass('')]" :component="ArrowForwardIosRound"></n-icon>
		</div>
	</div>
	<div class="relative w-50">
		<div class="warpInput">
			<n-input
				size="small"
				round
				class="headerSearchInput ml-5"
				clearable
				ref="target"
				v-model:value="mainStore.searchHistory"
				@focus="showPopover = true"
				:placeholder="defalutSearchKeyword.realkeyword"
			>
				<template #prefix>
					<n-icon class="cursor-pointer" :component="Search" @click="() => toSearchResult()"></n-icon>
				</template>
			</n-input>
			<transition name="fade-in-scale-up">
				<div
					class="searchWrapContainer absolute top-10 origin-top-left rounded-sm shadow-lg dark:shadow-black/60 z-10"
					ref="searchWrapContainerRef"
				>
					<n-scrollbar style="max-height: 500px">
						<div class="p-4 pb-0">
							<div class="flex items-center justify-between opacity-70">
								<div>
									<span class="pr-2">搜索历史</span>
									<n-popconfirm positive-text="确定">
										<template #trigger>
											<n-icon class="cursor-pointer" :component="Delete" />
										</template>
										确定删除历史记录?
									</n-popconfirm>
								</div>
								<n-button v-if="parseInt(defaultHeight) > 62" text @click="handleCheckAllClick">{{
									spread ? '收起' : '查看全部'
								}}</n-button>
							</div>
							<div class="mt-2 transition-height" :style="historyListStyle">
								<n-space>
									<n-tag
										v-for="(item, index) in mainStore.searchHistory"
										:key="item"
										closable
										size="small"
										round
										@click="toSearchResult(item)"
										@close="((e:MouseEvent)=>handleClearClick(e,index))"
										>{{ item }}
									</n-tag>
								</n-space>
							</div>
							<!-- 热搜榜 -->
							<div>
								<p class="mt-4 pl-4 opacity-70">热搜榜</p>
								<n-spin :show="hotSearchLoading">
									<div v-show="hotSearchLoading" class="h-60" />
									<div
										v-for="(item, index) in hotSearchList"
										:key="item.searchWord"
										class="flex cursor-pointer items-center p-5 hover:bg-gray-100 dark:hover:bg-gray-100/20"
									>
										<span
											class="text-base"
											:style="{ color: index >= 0 && index <= 2 ? themeVars.primaryColor : themeVars.textColor1 }"
											>{{ index + 1 }}</span
										>
										<div class="ml-4">
											<span class="text-base" :style="{ fontWeight: index >= 0 && index <= 2 ? 'bold' : 'initial' }">
												{{ item.searchWord }}
											</span>
											<span class="pl-2 text-sm opacity-40">{{ item.score }}</span>
										</div>
									</div>
								</n-spin>
							</div>
							<div v-show="mainStore.searchHistory.length > 0" class="py-4">
								<n-spin>
									<!-- <div v-show="suggestLoading"></div> -->
								</n-spin>
							</div>
						</div>
					</n-scrollbar>
				</div>
			</transition>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home {
	color: #000;
}
</style>
