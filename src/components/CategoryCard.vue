<script setup>
	defineProps(["category"]);
</script>

<template>
	<RouterLink :to="`menu/${category.slug}`">
		<general-card>
			<picture class="item-picture">
				<img :src="`${category.imageURL}`" :alt="`${category.slug}`" loading="lazy" />
			</picture>
			<div class="name-highlight">
				<span>{{ category.title.toUpperCase() }}</span>
			</div>
		</general-card>
	</RouterLink>
</template>

<style lang="scss">
	general-card {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		border-radius: 10px;
		gap: 20px;

		border: 1.5px solid var(--support-mute);
		padding: 10px;
		padding-bottom: 25px;
		height: 100%;
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
