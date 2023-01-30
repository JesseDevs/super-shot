<script setup>
	import { ref, computed } from "vue";
	import { useMenuStore } from "@/stores/menu";
	import ModuleThing from "../components/ModuleThing.vue";

	const menu = useMenuStore();

	let searchString = ref("");

	const filtered = computed(function () {
		return menu.products.filter(function (item) {
			var itemVariable = item.name.toUpperCase();
			return itemVariable.includes(searchString.value.toUpperCase());
		});
	});
	defineProps(["pageData"]);
</script>

<template>
	<section>
		<inner-column>
			<search-div>
				<ModuleThing :pageData="pageData" />

				<form action="">
					<div class="form-field">
						<label for="search">Enter Product</label>
						<input type="text" id="search" v-model="searchString" />
					</div>
				</form>
				<h2 class="chant-voice" v-if="searchString !== ''">Results for {{ searchString }}</h2>
				<h2 class="chant-voice" v-else>Results for All Products</h2>
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
			padding-left: 25px;
		}
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding-bottom: 15px;
	}
</style>
