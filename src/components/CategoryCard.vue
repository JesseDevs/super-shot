<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});

	defineProps({
		category: Object,
	});
</script>

<template>
	<li v-for="category in menu.categories">
		<RouterLink :to="`menu/${category.slug}`">
			<category-card>
				<picture class="item-picture">
					<img :src="`${category.imageURL}`" :alt="`${category.slug}`" loading="lazy" />
				</picture>
				<div class="name-highlight">
					<span>{{ category.title.toUpperCase() }}</span>
				</div>
			</category-card>
		</RouterLink>
	</li>
</template>

<style lang="scss">
	category-card {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		border-radius: 10px;
		gap: 20px;

		border: 2px solid var(--support-mute);
		padding: 10px;
		padding-bottom: 25px;
		height: 300px;
		transition: background-color ease-in-out 300ms;

		&:hover {
			background-color: var(--color-soft);
		}
	}

	.name-highlight {
		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--off-color);
		border-radius: 50px;
		margin: 0 auto;
		padding: 10px;

		width: 80%;
		max-width: 244px;
		height: 40px;

		span {
			color: var(--page);
			font-weight: 800;
		}
	}
</style>
