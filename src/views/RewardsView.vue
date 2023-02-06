<script setup>
	import { useProfilesStore } from "../stores/Profiles";
	defineProps(["pageData"]);

	const profiles = useProfilesStore();
	const profile = profiles.currentUser;
</script>

<template>
	<section>
		<inner-column>
			<h1 class="yell-voice">Rewards page</h1>
		</inner-column>
	</section>
</template>
