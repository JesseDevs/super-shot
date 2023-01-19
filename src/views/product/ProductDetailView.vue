<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});
</script>

<template>
	<inner-column>
		<module-thing>
			<h2 class="chant-voice">{{ category.title }}</h2>
			<div class="product-outlet">
				<RouterView :products="products" />
			</div>
		</module-thing>
	</inner-column>
</template>
