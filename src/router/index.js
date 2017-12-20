import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		redirect: '/login'
	}, {
		path: '/newsList',
		component: resolve => require(['../components/common/Home.vue'], resolve),
		children: [{
			path: '/',
			component: resolve => require(['../components/page/NewsList.vue'],
				resolve)
		}, {
			path: '/newsList',
			component: resolve => require(['../components/page/NewsList.vue'],
				resolve)
		}, {
			path: '/vuetable',
			component: resolve => require(['../components/page/VueTable.vue'],
					resolve) // vue-datasource组件
		}, {
			path: '/baseform',
			component: resolve => require(['../components/page/BaseForm.vue'],
				resolve)
		}, {
			path: '/vueeditor',
			component: resolve => require(['../components/page/VueEditor.vue'],
					resolve) // Vue-Quill-Editor组件
		}, {
			path: '/markdown',
			component: resolve => require(['../components/page/Markdown.vue'],
					resolve) // Vue-Quill-Editor组件
		}, {
			path: '/upload',
			component: resolve => require(['../components/page/Upload.vue'],
					resolve) // Vue-Core-Image-Upload组件
		}, {
			path: '/basecharts',
			component: resolve => require(['../components/page/BaseCharts.vue'],
					resolve) // vue-schart组件
		}, {
			path: '/drag',
			component: resolve => require(['../components/page/DragList.vue'],
					resolve) // 拖拽列表组件
		}, {
			path: '/news',
			component: resolve => require(['../components/page/News.vue'], resolve) // 新闻页面
		}, {
			path: '/person',
			component: resolve => require(['../components/page/Person.vue'],
					resolve) // 账号信息
		}, {
			path: '/images',
			component: resolve => require(['../components/page/ImgTable.vue'],
					resolve) // 图片新闻列表
		}, {
			path: '/addImgs',
			component: resolve => require(['../components/page/AddImgs.vue'],
					resolve) // 编辑图片新闻
		}]
	}, {
		path: '/login',
		component: resolve => require(['../components/page/Login.vue'], resolve)
	}, ]
})
