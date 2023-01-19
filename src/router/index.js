import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
					name: "list",
					component: MenuListView,
				},
				{
					path: ":slug",
					name: "detail",
					component: MenuDetailView,
					children: [
						{
							path: "",
							name: "product-list",
							component: ProductListView,
						},
						{
							path: "product-:id",
							name: "detail",
							component: ProductDetailView,
						},
					],
				},
			],
		},
	],
});

export default router;
