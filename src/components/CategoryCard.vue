<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	const route = useRoute();
	const menu = useMenuStore();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});

	defineProps({
		category: Object,
	});
</script>

<template>
	<category-card>
		<h1 class="loud-voice">{{ category.title }}</h1>
	</category-card>
</template>
