<script setup>
	import { RouterView } from 'vue-router';
	import ReturnNav from '@/partials/ReturnNav.vue';
	import ModuleThing from '@/components/ModuleThing.vue';

	import { useCategoryService } from '@/services/CategoryService';
	import { useRoute } from 'vue-router';
	defineProps(['pageData']);

	const categories = useCategoryService();
	const route = useRoute();
</script>
<template>
	<section>
		<!-- <ReturnNav v-if="route.path !== '/menu'" /> -->

		<module-thing v-if="route.name === 'menu/list'">
			<h1 class="attention-voice">
				<span class="main-color">Dunkin</span><span class="off-color">’ </span> CLASSICS & NEW FAVORITES
			</h1>

			<p class="intro tiny-voice">
				{{ pageData.subHeading }}
			</p>
		</module-thing>

		<RouterView :categories="categories.sortedList" />
	</section>
</template>

<style lang="scss">
	menu-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		padding-top: 10px;
		padding-bottom: 1.5rem;
		h1 {
			max-width: 23ch;
			font-weight: 700;
		}
	}
</style>
