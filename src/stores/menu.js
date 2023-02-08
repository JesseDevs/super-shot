import { reactive, computed, onMounted } from "vue";
import { defineStore } from "pinia";

import productsData from "@/data/products.json";

export const useMenuStore = defineStore("menu", function () {
	const products = reactive(productsData);

	return {
		products,
	};
});
