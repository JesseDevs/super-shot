<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import { useProfilesStore } from "../stores/profile";

	const profiles = useProfilesStore();
	const profile = profiles.currentUser;
	const menu = useMenuStore();
	const route = useRoute();

	const category = menu.categories.find(function (record) {
		return record.slug == route.params.slug;
	});

	const titleBasedOnRoute = computed(function () {
		if (route.path === "/") {
			return "Welcome to the home page";
		} else if (route.path === "/menu") {
			return "DUNKIN’ CLASSICS & NEW FAVORITES";
		} else if (route.path === "/profile") {
			return `Welcome to your profile ${profile.name}`;
		} else if (route.path === "/menu/coffee") {
			return "COFFEE";
		} else {
			return "Page not found";
		}
	});

	const textBasedOnRoute = computed(function () {
		if (route.path === "/") {
			return "👋🏼";
		} else if (route.path === "/menu") {
			return "Our menu is full of great-tasting items that will get you going and keep you running throughout your busy day. Plus, they’re always made to order—just the way you like.";
		} else if (route.path === "/menu/coffee") {
			return "Freshly crafted beverages served in a variety of delicious flavors. Ask to try your favorite beverages hot or served over ice.";
		} else {
			return "Page not found";
		}
	});
</script>
<template>
	<module-thing>
		<h1 class="chant-voice">{{ titleBasedOnRoute }}</h1>

		<p class="intro">
			{{ textBasedOnRoute }}
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
