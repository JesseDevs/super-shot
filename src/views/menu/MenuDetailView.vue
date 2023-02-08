<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	const route = useRoute();
	const menu = useMenuStore();
</script>

<template>
	<detail-block>
		<div class="product-outlet">
			<RouterView :category="category" />
		</div>
	</detail-block>
</template>
