import { defineStore } from 'pinia'
import state, { type playMode } from './state'

export const useMainStore = defineStore('main', {
	state: () => state,
	getters: {
		isActiveDarkTheme(state) {
			return state.theme === 'dark'
		}
	},
	actions: {
		toggleTheme() {
			const theme = this.theme === 'dark' ? 'light' : 'dark'
			this.changeTheme(theme)
		},
		changeTheme(theme: 'dark' | 'light') {
			if (theme === 'dark') {
				document.documentElement.classList.add('dark')
				document.documentElement.style.colorScheme = 'dark'
			} else {
				document.documentElement.classList.remove('dark')
				document.documentElement.style.colorScheme = ''
			}
			// 设置网页的配色方案为dark
			this.theme = theme
			localStorage.theme = theme
		},

		addSearchHistory(val: string) {
			if (this.searchHistory.includes(val)) return
			this.searchHistory.push(val)
			localStorage.sarchHistory = JSON.stringify(this.searchHistory)
		},
		removeSearchHistory(index: number) {
			this.searchHistory.splice(index, 1)
			localStorage.searchHistory = JSON.stringify(this.searchHistory)
		}
	}
})
