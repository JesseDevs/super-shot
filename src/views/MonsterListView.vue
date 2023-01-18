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
			<ul>
				<li v-for="monster in monsters.list">
					<RouterLink :to="`monsters/${monster.slug}`">
						{{ monster.name }}
						{{ monster.id }}
					</RouterLink>
				</li>
			</ul>
		</module-thing>
	</inner-column>
</template>
