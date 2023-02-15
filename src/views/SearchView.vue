<script setup>
	import { ref, computed } from 'vue';
	import ModuleThing from '../components/ModuleThing.vue';
	import { useProductsService } from '@/services/ProductsService';

	const p = useProductsService();
	let searchString = ref('');

	const filtered = computed(function () {
		if (searchString.value.length) {
			return p.list.filter(function (item) {
				var itemVariable = item.name.toUpperCase();
				return itemVariable.includes(searchString.value.toUpperCase());
			});
		}
		return p.list;
	});

	defineProps(['pageData']);
</script>

<template>
	<section>
		<inner-column>
			<search-div v-if="p">
				<module-thing>
					<h1 class="strict-voice">{{ pageData.title }}</h1>

					<p class="intro">{{ pageData.subHeading }}</p>
				</module-thing>

				<form action="">
					<div class="form-field">
						<label class="calm-voice" for="search">Enter Product</label>
						<input type="text" id="search" v-model="searchString" />
					</div>
				</form>
				<h5 class="strict-voice" v-if="searchString !== ''">Results for {{ searchString }}</h5>
				<h5 class="strict-voice" v-else>Results for All Products</h5>
			</search-div>
			<ul class="main-grid">
				<li v-for="product in filtered">
					<RouterLink :to="`menu/${product.category}/${product.id}`">
						<general-card>
							<picture class="item-picture">
								<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
							</picture>
							<div class="name-highlight">
								<span class="small-voice">{{ product.name.toUpperCase() }}</span>
							</div>
						</general-card>
					</RouterLink>
				</li>
			</ul>
		</inner-column>
	</section>
</template>

<style lang="scss">
	search-div {
		form {
			max-width: 400px;
		}
		label {
			font-weight: 500;
			padding-left: 20px;
		}
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding-bottom: 15px;
	}
</style>
