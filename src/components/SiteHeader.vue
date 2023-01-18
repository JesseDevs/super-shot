<script setup>
	import { RouterLink, useRoute } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	const ui = useInterfaceStore();
	const route = useRoute();
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<nav class="site-menu">
				<ul>
					<li><button @click="ui.toggleMenu()" type="submit">Toggle</button></li>
					<li><RouterLink to="/">Home</RouterLink></li>
					<li><RouterLink to="/monsters">Monsters</RouterLink></li>
				</ul>
			</nav>
		</inner-column>
	</header>
</template>

<style lang="scss">
	nav.site-menu {
		ul {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			li:first-of-type {
				flex-grow: 10;
				margin-right: auto;
			}
			a {
				padding: 3.5px 7px;

				&:hover {
					background-color: var(--color-soft);
				}
			}
		}
	}

	.router-link-active {
		box-shadow: inset 0px -12px 0px -9px var(--color);
	}
</style>
