<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import { useCartStore } from "@/stores/cart";

	const cart = useCartStore();
	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});

	const products = category.products;

	const product = products.find(function (record) {
		return record.id == route.params.id;
	});

	function selectSize(item) {
		product.sizes.forEach((i) => (i.selected = false));
		item.selected = true;
	}
</script>

<template>
	<edit-block>
		<landing-block>
			<picture class="item-picture">
				<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
			</picture>
			<h2 class="chant-voice">{{ product.name }}</h2>
			<p>{{ product.tagline }}</p>
			<p class="intro">
				{{ product.desc }}
			</p>

			<button class="button" @click="cart.addItem(product)">Add to cart</button>
		</landing-block>
		<p>Size</p>
		<div class="cup-size">
			<div v-for="size in product.sizes" @click="selectSize(size)" :class="{ selected: size.selected }">
				{{ size.size }}
			</div>
		</div>
	</edit-block>
</template>

<style lang="scss">
	div.cup-size {
		display: flex;
		gap: 10px;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50px;
			border: 2px solid black;
			font-weight: 500;
			background-color: var(--page-soft);

			transition: background-color ease-in-out 300ms;
			width: 40px;
			height: 40px;
			text-transform: uppercase;
			cursor: pointer;
		}

		div.selected {
			color: var(--page);
			background-color: var(--off-color);
		}
	}
</style>
