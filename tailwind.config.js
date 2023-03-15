/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {}
	},
	plugins: [],
	darkMode: 'class',
	corePlugins: {
		// 解决组件库中的组件样式冲突
		preflight: false
	}
}
