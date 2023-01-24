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
				<picture>
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
		gap: 20px;
		border: 1px solid var(--support-mute);
		border-radius: 10px;
		padding: 24px 30px;
		max-width: 340px;
		height: 300px;
		transition: background-color 0.8s;

		&:hover {
			background-color: var(--color-soft);
		}

		picture {
			max-width: 100%;
			margin: 0 auto;
			line-height: 0;

			img {
				max-height: 185px;
				max-width: 200px;
				width: auto;
				height: auto;
			}
		}
	}

	.name-highlight {
		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--off-color);
		border-radius: 50px;
		margin: 0 auto;

		width: 200px;
		height: 40px;

		span {
			color: var(--page);
			font-weight: 800;
		}
	}
</style>
