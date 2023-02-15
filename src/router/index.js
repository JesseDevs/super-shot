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

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
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
		},
		{
			path: '/create-category',
			name: 'create-category',
			component: CreateCategoryView,
		},
		{
			path: '/create-product',
			name: 'create-product',
			component: CreateProductView,
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
			children: [
				{
					path: '/profile/account',
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

export default router;
