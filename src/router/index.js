import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateView from '../views/create/CreateView.vue';
import MenuListView from '../views/menu/MenuListView.vue';
import MenuDetailView from '../views/menu/MenuDetailView.vue';
import ProductListView from '../views/product/ProductListView.vue';
import ProductDetailView from '../views/product/ProductDetailView.vue';
import CreateCategoryView from '../views/create/CreateCategoryView.vue';
import CreateProductView from '../views/create/CreateProductView.vue';
import AccountPage from '../views/profile/AccountPage.vue';
import BillingPage from '../views/profile/BillingPage.vue';
import FavoritesPage from '../views/profile/FavoritesPage.vue';

import { getCurrentUser } from 'vuefire';
import { useUserService } from '../services/UserService';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
	routes: [
		{
			path: '/',
			name: 'home',
			props: {
				pageData: {
					title: 'Dunkin’ Rewards',
					subHeading: 'A NEW WAY TO RUN',
				},
			},
			component: HomeView,
		},
		{
			path: '/menu',
			name: 'menu',
			component: () => import('../views/menu/MenuView.vue'),
			props: {
				pageData: {
					title: 'DUNKIN’ CLASSICS & NEW FAVORITES',
					subHeading:
						'Our menu is full of great-tasting items that will get you going and keep you running throughout your busy day. Plus, they’re always made to order—just the way you like.',
				},
			},
			children: [
				{
					path: '',
					name: 'menu/list',
					component: MenuListView,
				},
				{
					path: ':slug',
					name: 'category-detail',
					component: MenuDetailView,
					children: [
						{
							path: '',
							name: 'menu/category-list',
							component: ProductListView,
						},
						{
							path: ':id',
							name: 'menu/product-detail',
							component: ProductDetailView,
						},
					],
				},
			],
		},
		{
			path: '/create',
			name: 'create',
			component: CreateView,
			meta: { requiresAuth: true, requiresAdmin: true },
			children: [
				{
					path: '/create-category',
					name: 'create-category',
					component: CreateCategoryView,
					meta: { requiresAuth: true, requiresAdmin: true },
				},
				{
					path: '/create-product',
					name: 'create-product',
					component: CreateProductView,
					meta: { requiresAuth: true, requiresAdmin: true },
				},
			],
		},
		{
			path: '/checkout',
			name: 'checkout',
			component: () => import('../views/CheckoutView.vue'),
		},
		{
			path: '/search',
			name: 'search',
			props: {
				pageData: {
					title: 'Search',
					subHeading: "Let's find the right thing for you",
				},
			},
			component: () => import('../views/SearchView.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('../views/profile/ProfileView.vue'),
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'account',
					component: AccountPage,
				},
				{
					path: '/profile/billing',
					name: 'billing',
					component: BillingPage,
				},
				{
					path: '/profile/favorites',
					name: 'favorites',
					component: FavoritesPage,
				},
			],
		},
		{
			path: '/sign-in',
			name: 'sign-in',
			component: () => import('../views/SignInView.vue'),
		},
		{
			path: '/sign-up',
			name: 'sign-up',
			component: () => import('../views/SignUpView.vue'),
		},
		{
			path: '/sign-out',
			name: 'sign-out',
			component: () => import('../views/SignOutView.vue'),
		},
		{
			path: '/rewards',
			name: 'rewards',
			component: () => import('../views/RewardsView.vue'),
		},
		{
			path: '/:pathMatch(.*)',
			name: 'not-found',
			props: {
				pageData: {
					title: '404',
					subHeading: 'Off to the wrong foot...',
				},
			},
			component: () => import('../views/MyErrorView.vue'),
		},
	],
});

router.beforeEach(async (to) => {
	const user = useUserService();

	if (to.meta.requiresAuth) {
		const currentUser = await getCurrentUser();
		await user.getUserDocument;

		if (!currentUser) {
			return {
				path: '/sign-in',
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
	if (to.meta.requiresAdmin) {
		await user.getUserDocument;
		if (!user.isAdmin) {
			return {
				path: '/',
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
});

export default router;
