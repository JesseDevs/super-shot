<script setup>
	import { ref, computed } from "vue";
	import { useMenuStore } from "@/stores/menu";
	import { useRoute } from "vue-router";

	const route = useRoute();
	const menu = useMenuStore();

	const categories = menu.categories;
	let allProducts = categories.flatMap((category) => category.products);

	const searchString = ref("");

	const filtered = computed(function () {
		return allProducts.filter(function (item) {
			return item.name.includes(searchString.value);
		});
	});
</script>

<template>
	<section>
		<inner-column>
			<form action="">
				<label for="">Search</label>
				<input type="text" v-model="searchString" />
			</form>
			<h2 class="attention-voice">Results for {{ searchString }}</h2>

			<ul class="main-grid">
				<li v-for="item in filtered">
					<RouterLink :to="`menu/${item.category}/${item.id}`">
						<category-card>
							<picture>
								<img :src="`${item.imageURL}`" alt="iced" loading="lazy" />
							</picture>
							<div class="name-highlight">
								<span>{{ item.name.toUpperCase() }}</span>
							</div>
						</category-card>
					</RouterLink>
				</li>
			</ul>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>
