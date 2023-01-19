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
	<ul>
		<li v-for="product in category.products">
			<RouterLink :to="`menu/{{category.slug}}/product-${product.id}`">
				<category-card>
					<h2 class="chant-voice">{{ product.name }}</h2>
					{{ product.slug }}
				</category-card>
			</RouterLink>
		</li>
	</ul>
</template>
