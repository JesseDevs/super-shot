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
	<ul class="main-grid">
		<li v-for="product in category.products">
			<RouterLink :to="`${category.slug}/${product.id}`">
				<category-card>
					<picture>
						<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<div class="name-highlight">
						<span>{{ product.name.toUpperCase() }}</span>
					</div>
				</category-card>
			</RouterLink>
		</li>
	</ul>
</template>

<style lang="scss">
	category-card {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
		border: 1px solid var(--support-mute);
		border-radius: 10px;
		padding: 24px 30px;
		height: 100%;
		transition: background-color 0.8s;

		&:hover {
			background-color: var(--color-soft);
		}

		picture {
			max-width: 100%;
			margin: 0 auto;
			line-height: 0;

			img {
				max-height: 200px;
				max-width: 212px;
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
