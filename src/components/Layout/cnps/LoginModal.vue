<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { CloseOutline } from '@vicons/ionicons5'
import { getQrCode, getQrCodeImg, getQrCodeStatue } from '@/service'
import { useMessage } from 'naive-ui'
import { useMainStore } from '@/stores/main'
export interface LoginModalExpose {
	show: () => void
	close: () => void
}

type qrCodeStatus = 800 | 801 | 802 | 803

const showModal = ref(false)
const status = ref<qrCodeStatus | ''>()
const isLoadingQrCodeImg = ref(true)
let qrCodeImg = ref('')
let qrCodeKey = ''
let timer: number | undefined
const message = useMessage()
const mainStore = useMainStore()

defineExpose({
	show() {
		showModal.value = true
	},
	close() {
		showModal.value = false
	}
})

const getQsCodeKey = () => {
	isLoadingQrCodeImg.value = true
	getQrCode().then((res) => {
		qrCodeKey = res.data.data.unikey
		getQrCodePic()
	})
}

const getQrCodePic = () => {
	getQrCodeImg(qrCodeKey).then((res) => {
		qrCodeImg.value = res.data.data.qrimg
		isLoadingQrCodeImg.value = false
	})
	loopGetQrCodeStatus()
}

const loopGetQrCodeStatus = () => {
	timer = setInterval(async () => {
		const res = await getQrCodeStatue(qrCodeKey)

		if (timer === undefined) return
		status.value = res.data.data
		if (res.data.code === 803) {
			clearInterval(timer)
			message.success('登录成功')
			showModal.value = false
			status.value = ''
			localStorage.isLogin = true
			timer = undefined
			return
		}
		if (res.data.code === 800) {
			clearInterval(timer)
			message.warning('二维码已过期,请重新获取')
			timer = undefined
		}
	}, 1000)
}

const handleRefRefreshClick = () => {
	qrCodeImg.value = ''
	status.value = ''
	getQsCodeKey()
}

watch(showModal, (val) => {
	if (val) {
		getQsCodeKey()
	} else {
		clearInterval(timer)
	}
})

onUnmounted(() => {
	clearInterval(timer)
})
</script>

<template>
	<div class="login-modal">
		<n-modal v-model:show="showModal" :mask-closable="false" transform-origin="cneter">
			<n-card style="width: 350px; height: 420px" :border="false" size="small" preset="dialog" aria-modal="true">
				<template #header>
					<div class="flex justify-end">
						<n-icon class="cursor-pointer" size="25" :component="CloseOutline" @click="showModal = false"></n-icon>
					</div>
				</template>
				<div class="flex flex-col justify-between items-center" v-if="status !== 802">
					<p class="mt-5 text-3xl">扫码登录</p>
					<!-- 二维码图片 -->
					<n-spin :show="isLoadingQrCodeImg">
						<div class="relative mt-5">
							<img v-show="!isLoadingQrCodeImg" width="200" height="200" :src="qrCodeImg" alt="" />
						</div>
						<!-- 图片加载时的占位 -->
						<div v-show="isLoadingQrCodeImg" style="widht: 200px; height: 200px"></div>

						<!-- 二维码过期蒙层 -->
						<div v-if="status === 800" class="flex absolute inset-0 juetify-center items-center bg-black/90">
							<div class="text-white">
								<p>二维码已失效</p>
								<n-button size="small" type="primary" class="mt-4" @click="handleRefRefreshClick">点击刷新</n-button>
							</div>
						</div>
					</n-spin>
					<p class="mt-6">
						<span>使用</span>
						<span class="text-sky-500">网易云音乐App</span>
						<span>扫码登录</span>
					</p>
				</div>
				<div v-if="status === 802" class="mt-20">
					<n-result size="small" status="success" title="扫码成功" description="请在手机上确认登录"></n-result>
				</div>
			</n-card>
		</n-modal>
	</div>
</template>

<style lang="scss" scoped>
.login-modal {
	color: #000;
}
</style>
