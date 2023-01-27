<script setup>
	import CheckoutBtn from "../components/CheckoutBtn.vue";
	import ModuleThing from "../components/ModuleThing.vue";

	defineProps(["pageData"]);
</script>

<template>
	<section>
		<inner-column>
			<home-module>
				<ModuleThing :pageData="pageData" />

				<RouterView />

				<CheckoutBtn />
			</home-module>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>
