<script setup>
	import { useRoute } from "vue-router";
	import { useFirestore, useDocument } from "vuefire";
	import { doc, collection, query, where, limit } from "firebase/firestore";
	import { useProductsService } from "@/services/ProductsService";
	import { useCategoryService } from "@/services/CategoryService";

	const p = useProductsService();
	const c = useCategoryService();
	const route = useRoute();

	const selectedCategory = query(c.categoriesData, where("slug", "==", route.params.slug), limit(1));
	const current = useDocument(selectedCategory);

	const xp = query(p.productsData, where("category", "==", route.params.slug));
	const allProducts = useDocument(xp);
</script>

<template>
	<detail-block>
		<div class="product-outlet">
			<h1 v-if="current">{{ current[0].title }}</h1>

			<ul v-if="allProducts" class="main-grid">
				<li v-for="product in allProducts">
					<RouterLink :to="`${product.category}/${product.id}`">
						<general-card>
							<picture class="item-picture">
								<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
							</picture>
							<div class="name-highlight">
								<span class="small-voice">{{ product.name }}</span>
							</div>
						</general-card>
					</RouterLink>
				</li>
			</ul>
		</div>
	</detail-block>
</template>
