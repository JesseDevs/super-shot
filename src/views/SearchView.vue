<script setup>
	import { ref, computed } from "vue";
	import { useMenuStore } from "@/stores/menu";
	import { useRoute } from "vue-router";

	const route = useRoute();
	const menu = useMenuStore();

	let searchString = ref("");
</script>

<template>
	<section>
		<inner-column>
			<form action="">
				<label for="">Search</label>
				<input type="text" v-model="searchString" />
			</form>
			<h2 class="attention-voice" v-if="searchString !== ''">Results for {{ searchString }}</h2>
			<h2 class="chant-voice" v-else>Results for All Products</h2>

			<ul class="main-grid">
				<li v-for="product in menu.products">
					<RouterLink :to="`menu/${product.category}/${product.id}`">
						<general-card>
							<picture class="item-picture">
								<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
							</picture>
							<div class="name-highlight">
								<span>{{ product.name.toUpperCase() }}</span>
							</div>
						</general-card>
					</RouterLink>
				</li>
			</ul>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>
