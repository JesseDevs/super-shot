<script setup>
	import { useCategoryService } from "@/services/CategoryService";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CategoryCard from "../../components/CategoryCard.vue";

	const route = useRoute();
	const menu = useMenuStore();

	const categoryService = useCategoryService();
</script>

<template>
	<menu-list>
		<ul class="main-grid">
			<li v-for="category in categoryService.sortedList">
				<CategoryCard :category="category" />
			</li>
		</ul>
	</menu-list>
</template>

<style lang="scss">
	menu-list {
		display: block;
	}
</style>
