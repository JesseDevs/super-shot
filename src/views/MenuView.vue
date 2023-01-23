<script setup>
	import { RouterView } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CheckoutBtn from "../components/CheckoutBtn.vue";
	const menu = useMenuStore();
</script>
<template>
	<section>
		<inner-column>
			<module-thing>
				<h1 class="loud-voice">Menu</h1>

				<div class="outlet">
					<RouterView :menu="menu" />
					<CheckoutBtn />
				</div>
			</module-thing>
		</inner-column>
	</section>
</template>
<style></style>
