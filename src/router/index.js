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
			component: HomeView,
		},
		{
			path: "/menu",
			name: "menu",
			component: () => import("../views/MenuView.vue"),
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
			path: "/sign-in",
			name: "sign-in",
			component: () => import("../views/SignInView.vue"),
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: () => import("../views/SignUpView.vue"),
		},
		{
			path: "/cart",
			name: "cart",
			component: () => import("../views/CartView.vue"),
		},
	],
});

export default router;
