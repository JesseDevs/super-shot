<script setup>
	import { RouterView } from "vue-router";
	import SiteHeader from "./components/SiteHeader.vue";
	import SiteFooter from "./components/SiteFooter.vue";
	import SpriteSheet from "./components/SpriteSheet.vue";
</script>

<template>
	<vue-app>
		<SpriteSheet />
		<SiteHeader />

		<main class="outlet">
			<RouterView />
		</main>

		<SiteFooter />
	</vue-app>
</template>

<style lang="scss"></style>
