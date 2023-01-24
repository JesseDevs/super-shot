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
	<detail-block>
		<h2 class="chant-voice">{{ category.title }}</h2>
		<div class="product-outlet">
			<RouterView :category="category" />
		</div>
	</detail-block>
</template>
