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
	<search-div v-if="p">
		<module-thing>
			<h1 class="attention-voice">{{ pageData.title }}</h1>

			<p class="intro tiny-voice">{{ pageData.subHeading }}</p>
		</module-thing>

		<form action="">
			<div class="form-field">
				<label class="calm-voice" for="search">Enter Product</label>
				<input type="text" id="search" v-model="searchString" />
			</div>
		</form>
		<h5 class="strict-voice" v-if="searchString !== ''">Results: {{ searchString }}</h5>
		<h5 class="strict-voice" v-else>Results: All&nbsp;Products</h5>
	</search-div>
	<ul class="main-grid">
		<li v-for="product in filtered">
			<RouterLink :to="`menu/${product.category}/${product.slug}`">
				<general-card>
					<picture class="item-picture">
						<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<div class="name-highlight">
						<span class="tiny-voice">{{ product.name.toUpperCase() }}</span>
					</div>
				</general-card>
			</RouterLink>
		</li>
	</ul>
</template>

<style lang="scss">
	search-div {
		h5 {
			text-transform: uppercase;
		}
		form {
			max-width: 500px;
			width: 100%;

			label {
				max-width: fit-content;
				padding-bottom: 10px;
			}

			input {
				flex-grow: 1;
			}
		}
		label {
			font-weight: 500;
			padding-left: 20px;
		}
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding-bottom: 15px;
		align-items: center;

		@media (min-width: 450px) {
			.form-field {
				flex-direction: row;
				label {
					padding: 0;
					padding-right: 20px;
				}
			}
		}
	}
</style>
