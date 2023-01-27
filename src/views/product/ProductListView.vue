<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CategoryCard from "../../components/CategoryCard.vue";

	const route = useRoute();
	const menu = useMenuStore();

	const allProducts = computed(function () {
		const filtered = [];
	});
</script>

<template>
	<ul class="main-grid">
		<li v-for="product in allProducts">
			<RouterLink :to="`menu/${product.slug}/${product.id}`">
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
