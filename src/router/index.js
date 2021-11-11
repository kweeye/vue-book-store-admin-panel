import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login'
import Admin from '../views/Admin'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin,
		children: [{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('../views/Dashboard'),
		},
		{
			path: '/account-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'account-list',
			component: () => import('../views/account/accountList'),
		},
		{
			path: '/account-create',
			name: 'account-create',
			component: () => import('../views/account/accountCreate'),
		},
		{
			path: '/account-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'account-edit',
			component: () => import('../views/account/accountEdit'),
		},
		{
			path: '/category-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'category-list',
			component: () => import('../views/category/categoryList'),
		},
		{
			path: '/category-create',
			name: 'category-create',
			component: () => import('../views/category/categoryCreate'),
		},
		{
			path: '/category-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'category-edit',
			component: () => import('../views/category/categoryEdit'),
		},
		{
			path: '/banner-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'banner-list',
			component: () => import('../views/banner/bannerList'),
		},
		{
			path: '/banner-create',
			name: 'banner-create',
			component: () => import('../views/banner/bannerCreate'),
		},
		{
			path: '/banner-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'banner-edit',
			component: () => import('../views/banner/bannerEdit'),
		},
		{
			path: '/author-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'author-list',
			component: () => import('../views/author/authorList'),
		},
		{
			path: '/author-create',
			name: 'author-create',
			component: () => import('../views/author/authorCreate'),
		},
		{
			path: '/author-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'author-edit',
			component: () => import('../views/author/authorEdit'),
		},
		{
			path: '/tag-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'tag-list',
			component: () => import('../views/tag/tagList'),
		},
		{
			path: '/tag-create',
			name: 'tag-create',
			component: () => import('../views/tag/tagCreate'),
		},
		{
			path: '/tag-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'tag-edit',
			component: () => import('../views/tag/tagEdit'),
		},
		{
			path: '/book-list',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
			  },
			name: 'book-list',
			component: () => import('../views/book/bookList'),
		},
		{
			path: '/book-create',
			name: 'book-create',
			component: () => import('../views/book/bookCreate'),
		},
		{
			path: '/book-edit',
			query: {
				page: 1,
				reverse: '',
				sort: '',
				name: '',
				id: '',
			  },
			name: 'book-edit',
			component: () => import('../views/book/bookEdit'),
		},
		]
	},

	{
		path: '/*',
		redirect: '/dashboard'
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})


export default router