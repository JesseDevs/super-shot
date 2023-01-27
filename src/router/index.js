import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateView from "../views/CreateView.vue";
import MenuListView from "../views/menu/MenuListView.vue";
import ProductListView from "../views/product/ProductListView.vue";
import ProductDetailView from "../views/product/ProductDetailView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			props: {
				pageData: {
					title: "Welcome to the home page",
					subHeading: "👋🏼",
					buttonText: "Finish Order",
				},
			},
			component: HomeView,
		},
		{
			path: "/menu",
			name: "menu",
			props: {
				pageData: {
					title: "DUNKIN’ CLASSICS & NEW FAVORITES",
					subHeading:
						"Our menu is full of great-tasting items that will get you going and keep you running throughout your busy day. Plus, they’re always made to order—just the way you like.",
					buttonText: "Checkout",
				},
			},
			component: () => import("../views/MenuView.vue"),
			children: [
				{
					path: "",
					name: "menu/list",
					component: MenuListView,
				},
				{
					path: ":slug",
					name: "menu/category/product-list",
					component: ProductListView,
					children: [
						{
							path: "",
							name: "menu/category/product-list",
							component: ProductListView,
						},
						{
							path: ":id",
							name: "menu/detail/product-detail",
							component: ProductDetailView,
						},
					],
				},
			],
		},
		{
			path: "/create",
			name: "create",
			component: CreateView,
		},
		{
			path: "/cart",
			name: "cart",
			component: () => import("../views/CartView.vue"),
		},
		{
			path: "/search",
			name: "search",
			component: () => import("../views/SearchView.vue"),
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import("../views/ProfileView.vue"),
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: () => import("../views/SignUpView.vue"),
		},
	],
});

export default router;
