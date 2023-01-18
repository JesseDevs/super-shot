<script setup>
	import { useRoute } from "vue-router";
	import { useMonsterStore } from "@/stores/monsters";

	const route = useRoute();
	const monsters = useMonsterStore();

	const monster = monsters.list.find(function (record) {
		return record.slug == route.params.slug;
	});
</script>

<template>
	<inner-column>
		<module-thing>
			<h1 class="loud-voice">{{ monster }}</h1>
		</module-thing>
	</inner-column>
</template>
