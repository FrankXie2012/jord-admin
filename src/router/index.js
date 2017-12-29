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
				resolve) // 文章列表
		}, {
			path: '/images',
			component: resolve => require(['../components/page/ImgTable.vue'],
				resolve) // 图片新闻列表
		}, {
			path: '/addImgs',
			component: resolve => require(['../components/page/AddImgs.vue'],
				resolve) // 编辑图片新闻
		}, {
			path: '/news',
			component: resolve => require(['../components/page/News.vue'], resolve) // 新闻页面
		}, {
			path: '/newsAudit',
			component: resolve => require(['../components/page/NewsAudit.vue'],
				resolve) // 文章审阅
		}, {
			path: '/users',
			component: resolve => require(['../components/page/Users.vue'],
				resolve) // 用户列表
		}, {
			path: '/addUser',
			component: resolve => require(['../components/page/AddUser.vue'],
				resolve) // 新增用户
		}, {
			path: '/person',
			component: resolve => require(['../components/page/Person.vue'],
				resolve) // 账号信息
		}]
	}, {
		path: '/login',
		component: resolve => require(['../components/page/Login.vue'], resolve)
	}, ]
})
