<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});

	const products = category.products;

	const product = products.find(function (record) {
		return record.id == route.params.id;
	});
</script>

<template>
	<category-card>
		<h2 class="chant-voice">{{ product.name }}</h2>
	</category-card>
</template>
