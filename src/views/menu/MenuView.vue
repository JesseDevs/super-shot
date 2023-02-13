<script setup>
	import { RouterView } from "vue-router";
	import ReturnNav from "@/partials/ReturnNav.vue";
	import ModuleThing from "@/components/ModuleThing.vue";

	import { useCategoryService } from "@/services/CategoryService";
	import { useRoute } from "vue-router";
	defineProps(["pageData"]);

	const categories = useCategoryService();
	const route = useRoute();
</script>
<template>
	<section>
		<!-- <ReturnNav v-if="route.path !== '/menu'" /> -->
		<!-- 
		<ModuleThing v-if="route.name !== 'menu/detail/product-detail'" :pageData="pageData" /> -->

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
