<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CategoryCard from "../../components/CategoryCard.vue";

	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});
</script>

<template>
	<ul class="main-grid">
		<li v-for="product in category.products">
			<RouterLink :to="`${category.slug}/${product.id}`">
				<category-card>
					<picture class="item-picture">
						<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<div class="name-highlight">
						<span>{{ product.name.toUpperCase() }}</span>
					</div>
				</category-card>
			</RouterLink>
		</li>
	</ul>
</template>

<style lang="scss"></style>
