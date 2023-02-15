<script setup>
	import { useRoute } from 'vue-router';
	import { useFirestore, useDocument } from 'vuefire';
	import { doc, collection, query, where, limit } from 'firebase/firestore';
	import { useProductsService } from '@/services/ProductsService';
	import { useCategoryService } from '@/services/CategoryService';

	const route = useRoute();

	const c = useCategoryService();
	const selectedCategory = computed(() => {
		const slug = route.params.slug;
		return query(c.categoriesData, where('slug', '==', slug));
	});
	const current = useDocument(selectedCategory.value);

	const p = useProductsService();
	const xp = query(p.productsData, where('category', '==', route.params.slug));
	const allProducts = useDocument(xp);
</script>

<template>
	<detail-block v-if="current">
		<module-thing v-if="route.name !== 'menu/product-detail'">
			<h1 class="attention-voice">{{ current[0].title }}</h1>

			<p class="intro">{{ current[0].info }}</p>
		</module-thing>

		<RouterView :allProducts="allProducts" />
	</detail-block>
</template>
