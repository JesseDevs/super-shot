<script setup>
	import { useUserService } from '@/services/UserService';
	import { useProductsService } from '@/services/ProductsService';

	const p = useProductsService();

	// const filtered = computed(function () {
	// 	return p.list.filter(function (item) {
	// 		var itemVariable = item.name.toUpperCase();
	// 		return itemVariable.includes(searchString.value.toUpperCase());
	// 	});
	// });

	const user = useUserService();
</script>

<template>
	<favorites-list>
		<text-content>
			<p class="attention-voice">Favorites List</p>
			<p class="intro tag"><em>Sweet Delectables</em></p>
		</text-content>

		<ul>
			<!-- <li class="item-in-cart" v-for="product in user.cart.groups">
			<picture class="item-picture">
				<img :src="`${product[0].imageURL}`" alt="iced" loading="lazy" />
			</picture>
			<p>{{ product[0].name }}</p>
			<div class="quantityBox">
				<button @click="user.cart.groupPlus(product[0])">
					<SvgIcon icon="sort-asc" />
				</button>
				{{ product.length }}
				<button @click="user.cart.groupMinus(product[0])">
					<SvgIcon icon="sort-desc" />
				</button>
			</div>
			<p>${{ product[0].price }}</p>
		</li> -->
			<p>thing</p>
		</ul>
	</favorites-list>
</template>

<style lang="scss">
	favorites-list {
		display: flex;
		flex-direction: column;
		text-content {
			text-align: left;
			align-items: flex-start;

			p.tag {
				color: var(--off-color);
			}
		}
	}
</style>
