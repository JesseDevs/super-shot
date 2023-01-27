import { reactive, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

export const useMenuStore = defineStore("menu", function () {
	const categories = reactive(categoriesData);
	const products = reactive(productsData);

	return {
		products,
		categories,
	};
});
