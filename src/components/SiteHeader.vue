<script setup>
	import { RouterLink, useRoute } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	const ui = useInterfaceStore();
	const route = useRoute();
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<button class="menu-toggle" @click="ui.toggleMenu()" type="submit">Toggle</button>
			<nav class="site-menu">
				<ul>
					<li><RouterLink @click="ui.toggleMenu()" to="/">Home</RouterLink></li>
					<li><RouterLink @click="ui.toggleMenu()" to="/monsters">Monsters</RouterLink></li>
				</ul>
			</nav>
		</inner-column>
	</header>
</template>

<style lang="scss">
	header inner-column {
		padding: 1rem 1rem;
	}
	nav.site-menu {
		display: none;
		position: absolute;
		top: 50px;
		height: 150px;
		width: 100%;
		z-index: 10;

		ul {
			max-width: 50%;
			height: 100%;
			background-color: var(--support);
			a {
				padding: 3.5px 7px;
				color: var(--page);

				&:hover {
					color: var(--support);
					background-color: var(--color-soft);
				}
			}
		}
	}
	header.toggle-open {
		nav.site-menu {
			display: block;
		}
	}

	.router-link-active {
		box-shadow: inset 0px -12px 0px -9px var(--color);
	}

	@media (min-width: 500px) {
		.menu-toggle {
			display: none;
		}
		nav.site-menu {
			display: block;
			position: static;
			height: auto;

			ul {
				display: flex;
				flex-direction: row;
				align-items: center;
				max-width: none;
				background-color: var(--page);
				justify-content: flex-end;
				a {
					padding: 3.5px 7px;
					color: var(--support);

					&:hover {
						background-color: var(--color-soft);
					}
				}
			}
		}
	}
</style>
