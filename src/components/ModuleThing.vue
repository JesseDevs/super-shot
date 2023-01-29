<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useProfilesStore } from "../stores/Profiles";
	import { useMenuStore } from "@/stores/menu";

	defineProps(["pageData"]);
	const profiles = useProfilesStore();
	const profile = profiles.currentUser;
	const route = useRoute();
	const menu = useMenuStore();

	const category = computed(function () {
		return menu.categories.find(function (record) {
			return record.slug == route.params.slug;
		});
	});
</script>
<template>
	<module-thing v-if="route.params.slug == `coffee`">
		<h1 class="strict-voice">{{ category.title }}</h1>

		<p class="intro">{{ category.info }}</p>
	</module-thing>

	<module-thing v-else>
		<h1 class="strict-voice">{{ pageData.title }}</h1>

		<p class="intro">
			{{ pageData.subHeading }}
		</p>
	</module-thing>
</template>

<style lang="scss">
	module-thing {
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
			font-weight: 800;
			line-height: 1.3;
		}

		.intro {
			font-size: clamp(0.65rem, calc(0.63rem + 0.13vw), 0.72rem);
			max-width: 45ch;
		}

		@media (min-width: 600px) {
			.intro {
				font-size: clamp(0.94rem, calc(0.87rem + 0.34vw), 1.13rem);
				max-width: 64ch;
			}
		}
	}
</style>
