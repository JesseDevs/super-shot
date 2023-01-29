<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	const route = useRoute();
	const menu = useMenuStore();

	const allProductsInCategory = computed(function () {
		var filtered = [];
		menu.products.forEach((product) => {
			if (product.category == route.params.slug) {
				filtered.push(product);
			}
		});
		return filtered;
	});
</script>

<template>
	<ul class="main-grid">
		<li v-for="product in allProductsInCategory">
			<RouterLink :to="`${product.category}/${product.id}`">
				<general-card>
					<picture class="item-picture">
						<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<div class="name-highlight">
						<span>{{ product.name }}</span>
					</div>
				</general-card>
			</RouterLink>
		</li>
	</ul>
</template>

<style lang="scss"></style>
