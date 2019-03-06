const pkg = require('./package')


module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },

	/*
  ** Global CSS
  */
	css: [
		'iview/dist/styles/iview.css',
		'coc-nuxt-iview/dist/index.css'
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'@/plugins/iview',
		'@/plugins/c.js'
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		'@nuxtjs/axios',
	],
	axios: {
		// proxyHeaders: false
	},
	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
      
		}
	}
}
