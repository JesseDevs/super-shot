<script setup>
	import { useRoute } from 'vue-router';
	import { useFirestore, useDocument } from 'vuefire';
	import { doc, collection, query, where, limit } from 'firebase/firestore';
	import { useCategoryService } from '@/services/CategoryService';
	defineProps(['pageData']);

	const route = useRoute();
	console.log(route.params);
	const c = useCategoryService();

	const selectedCategory = computed(() => {
		const slug = route.params.slug;
		console.log(slug);
		return query(c.categoriesData, where('slug', '==', slug));
	});
	const current = useDocument(selectedCategory.value);
</script>
<template v-if="current">
	<module-thing v-if="route.name === 'category-detail'">
		<h1 class="strict-voice">{{ current[0].title }}</h1>

		<p class="intro">{{ current[0].info }}</p>
	</module-thing>
</template>

<style lang="scss">
	module-thing {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		padding-top: 10px;
		padding-bottom: 1.5rem;
		h1 {
			font-weight: 800;
			line-height: 1.3;
			text-transform: uppercase;
		}

		.intro {
			font-size: clamp(0.78rem, calc(0.74rem + 0.22vw), 0.9rem);
			max-width: 45ch;
		}

		@media (min-width: 600px) {
			.intro {
				font-size: clamp(0.94rem, calc(0.87rem + 0.34vw), 1.13rem);
				max-width: 64ch;
			}
		}
	}
</style>
