<script setup lang="ts">
import Layout from './components/Layout/Layout.vue'
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<div id="app">
			<Layout /></div
	></n-config-provider>
</template>

<style></style>
