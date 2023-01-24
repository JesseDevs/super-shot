<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import { useCartStore } from "@/stores/cart";

	const cart = useCartStore();
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
	<edit-block>
		<h2 class="chant-voice">{{ product.name }}</h2>
		<button @click="cart.addItem(product)">Add to cart</button>
	</edit-block>
</template>
