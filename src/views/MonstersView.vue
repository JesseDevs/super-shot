<script setup>
	import { RouterView } from "vue-router";
	import { useMonsterStore } from "@/stores/monsters";
	const monsters = useMonsterStore();
</script>
<template>
	<section>
		<inner-column>
			<module-thing>
				<h1 class="loud-voice">Monsters</h1>

				<div class="outlet">
					<RouterView :monsters="monsters" />
				</div>
			</module-thing>
		</inner-column>
	</section>
</template>
<style></style>
