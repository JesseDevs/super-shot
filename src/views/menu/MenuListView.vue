<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CategoryCard from "../../components/CategoryCard.vue";

	const route = useRoute();
	const menu = useMenuStore();
</script>

<template>
	<menu-list>
		<ul class="main-grid">
			<li v-for="category in menu.categories">
				<RouterLink :to="`menu/${category.slug}`">
					<category-card>
						<h2 class="chant-voice">{{ category.title }}</h2>
					</category-card>
				</RouterLink>
			</li>
		</ul>
	</menu-list>
</template>

<style lang="scss">
	menu-list {
		display: block;
	}
</style>
