import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateView from "../views/CreateView.vue";
import MenuListView from "../views/menu/MenuListView.vue";
import MenuDetailView from "../views/menu/MenuDetailView.vue";
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
				},
			},
			component: HomeView,
		},
		{
			path: "/menu",
			name: "menu",
			component: () => import("../views/MenuView.vue"),
			props: {
				pageData: {
					title: "DUNKIN’ CLASSICS & NEW FAVORITES",
					subHeading:
						"Our menu is full of great-tasting items that will get you going and keep you running throughout your busy day. Plus, they’re always made to order—just the way you like.",
				},
			},
			children: [
				{
					path: "",
					name: "menu/list",
					component: MenuListView,
				},
				{
					path: ":slug",
					name: "menu/detail",
					component: MenuDetailView,
					children: [
						{
							path: "",
							name: "menu/detail/product-list",
							component: ProductListView,
						},
						{
							path: ":id",
							name: "menu/detail/product-detail",
							component: ProductDetailView,
							children: [
								{
									path: "update",
									name: "update",
									component: ProductDetailView,
								},
							],
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
			path: "/checkout",
			name: "checkout",
			component: () => import("../views/CheckoutView.vue"),
		},
		{
			path: "/search",
			name: "search",
			props: {
				pageData: {
					title: "Search",
					subHeading: "Let's find the right thing for you",
				},
			},
			component: () => import("../views/SearchView.vue"),
		},
		{
			path: "/profile",
			name: "profile",
			props: {
				pageData: {
					title: "This is your profile",
					subHeading: "Your name",
				},
			},
			component: () => import("../views/ProfileView.vue"),
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: () => import("../views/SignUpView.vue"),
		},
		{
			path: "/:pathMatch(.*)",
			name: "not-found",
			props: {
				pageData: {
					title: "404",
					subHeading: "Off to the wrong foot...",
				},
			},
			component: () => import("../views/MyErrorView.vue"),
		},
	],
});

export default router;
