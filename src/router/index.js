import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MonsterListView from "../views/MonsterListView.vue";
import MonsterDetailView from "../views/MonsterDetailView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/monsters",
			name: "monsters",
			component: () => import("../views/MonstersView.vue"),
			children: [
				{
					path: "",
					name: "list",
					component: MonsterListView,
				},
				{
					path: ":slug",
					name: "detail",
					component: MonsterDetailView,
				},
			],
		},
	],
});

export default router;
