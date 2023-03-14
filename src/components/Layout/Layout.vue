<script setup lang="ts">
import LayoutHeader from './cnps/LayoutHeader.vue'
import LayoutLeftMenu from './cnps/LayoutLeftMenu.vue'
</script>

<template>
	<div class="layout-container" style="width: 85vw; height: 100vh; margin: 0 auto; border: 1px solid #000">
		<n-layout>
			<layout-header></layout-header>
			<layout-left-menu></layout-left-menu>
		</n-layout>
	</div>
</template>

<style lang="scss" scoped>
.home {
	color: #000;
}
</style>
