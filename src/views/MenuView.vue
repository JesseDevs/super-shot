<script setup>
	import { RouterView } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import ReturnNav from "../components/ReturnNav.vue";
	import ModuleThing from "../components/ModuleThing.vue";
	import { useRoute } from "vue-router";
	defineProps(["pageData"]);

	const route = useRoute();
	const menu = useMenuStore();
</script>
<template>
	<section>
		<ReturnNav v-if="route.path !== '/menu'" />

		<ModuleThing v-if="route.name !== 'menu/detail/product-detail'" :pageData="pageData" />

		<RouterView :menu="menu" />
	</section>
</template>

<style lang="scss">
	menu-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		padding-top: 10px;
		padding-bottom: 1.5rem;
		h1 {
			max-width: 23ch;
			font-weight: 700;
		}
	}
</style>
