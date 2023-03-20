<script setup>
	import { useUserService } from '@/services/UserService';
	import { useProductsService } from '@/services/ProductsService';
	import ShowCode from '@/components/ShowCode.vue';

	const p = useProductsService();
	const user = useUserService();

	const favList = [];
	user.favorites.forEach((doc) => {
		favList.push(doc.id);
	});

	for (const id in favList) {
		if (p.list.includes(favList[id])) {
			productsFiltered.push(favList[id]);
		}
	}

	const newFilter = computed(function () {
		const productsFiltered = [];
		p.list.forEach((doc) => {
			if (favList.includes(doc.id)) {
				console.log('hi');
				productsFiltered.push(doc);
			}
		});
		return productsFiltered;
	});
</script>

<template>
	<favorites-list>
		<text-content>
			<p class="attention-voice">Favorites List</p>
			<p class="intro tag"><em>Sweet Delectables</em></p>
		</text-content>

		<ShowCode :code="newFilter" />

		<ul>
			<li class="item-in-cart" v-for="product in newFilter">
				<picture class="item-picture">
					<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
				</picture>
				<p>{{ product.name }}</p>

				<p>${{ product.price }}</p>
			</li>
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
