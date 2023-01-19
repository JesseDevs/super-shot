<script setup>
	import { RouterView } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	const menu = useMenuStore();
</script>
<template>
	<section>
		<inner-column>
			<module-thing>
				<h1 class="loud-voice">Menu</h1>

				<div class="outlet">
					<RouterView :menu="menu" />
				</div>
			</module-thing>
		</inner-column>
	</section>
</template>
<style></style>
