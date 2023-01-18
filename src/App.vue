<script setup>
	import { RouterView } from "vue-router";
	import SiteHeader from "./components/SiteHeader.vue";
	import SiteFooter from "./components/SiteFooter.vue";
</script>

<template>
	<vue-app>
		<SiteHeader />

		<main class="outlet">
			<RouterView />
		</main>

		<SiteFooter />
	</vue-app>
</template>

<style lang="scss"></style>
