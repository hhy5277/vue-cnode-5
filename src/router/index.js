/*
 路由配置
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import * as types from '../store/mutation-types'

Vue.use(VueRouter)

VueRouter.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}

const router = new VueRouter({
	routes: [{
		path: '/',
		component: resolve => require(['../views/index.vue'], resolve)
	}, {
		path: '/login',
		name: 'login',
		component: resolve => require(['../views/login.vue'], resolve)
	},{
		path: '/topic/:topicId',
		name: 'topic',
		component: resolve => require(['../views/topic.vue'], resolve)
	}, {
		path: '/createTopic',
		name: 'createTopic',
		meta: { requireAuth: true },
		component: resolve => require(['../views/createTopic.vue'], resolve)
	}, {
		path: '/comment/:topicId',
		name: 'comment',
		component: resolve => require(['../views/comments.vue'], resolve)
	}, {
		path: '/user/:loginname',
		name: 'user',
		component: resolve => require(['../views/user.vue'], resolve)
	},]
})

//页面刷新时，重新赋值userInfo
if(sessionStorage.userInfo) {
	store.commit(types.SET_USER_INFO, JSON.parse(sessionStorage.userInfo));
}

router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth) { //判断是否需要登录权限
		if (store.state.user.token) { //验证store中是否存在token
			next();
		} else {
			next({
				path: '/login',
				query: {redirect: to.fullPath} //将跳转的路由作为参数，登录成功跳转到该路由
			});
		}
	} else {
		next();
	}
})

export default router;