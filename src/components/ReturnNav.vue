<script setup>
	import { RouterLink, useRoute } from "vue-router";
	const route = useRoute();
</script>

<template>
	<return-nav>
		<div>
			<p>&lt;</p>
			<RouterLink class="small-voice" to="/menu">Menu</RouterLink>
			<p>/</p>
			<a class="small-voice" @click="$router.back()"> {{ route.path }}</a>
		</div>
	</return-nav>
</template>

<style lang="scss">
	return-nav {
		display: block;

		div {
			display: flex;
			gap: 5px;
			align-items: center;
			justify-content: flex-start;

			a {
				font-weight: 500;
				cursor: pointer;

				&:hover {
					color: var(--color);
					text-decoration: underline;
				}
			}
		}
	}
</style>
