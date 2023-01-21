<script setup>
	import { RouterLink, useRoute } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	import { useCartStore } from "../stores/cart";
	import location from "@/assets/images/location-icon.vue";
	import burger from "@/assets/images/burger-icon.vue";

	const ui = useInterfaceStore();
	const route = useRoute();
	const cart = useCartStore();
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<nav class="top-row">
				<button class="menu-toggle" @click="ui.toggleMenu()" type="submit" aria-label="Main Menu">
					<burger />
				</button>

				<RouterLink class="strict-voice" @click="ui.specificToggle()" to="/">LOGO.</RouterLink>

				<RouterLink class="location-btn" to="/cart">
					<div class="items-cart-value">
						{{ cart.itemsInCart }}
					</div>
					<location />
				</RouterLink>
			</nav>

			<nav class="site-menu bottom-row">
				<signin-block>
					<RouterLink class="small-voice" @click="ui.toggleMenu()" to="/sign-up">Sign Up</RouterLink
					><RouterLink class="small-voice" to="/sign-in" @click="ui.toggleMenu()">Sign In</RouterLink>
					<span class="tiny-voice">Not a Dunkin' Rewards memeber?</span>
				</signin-block>
				<ul>
					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/">Home</RouterLink>
					</li>

					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/menu">Menu</RouterLink>
					</li>

					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/create"
							>Create</RouterLink
						>
					</li>
				</ul>
			</nav>
		</inner-column>
	</header>
</template>

<style lang="scss">
	header inner-column {
		padding: 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	signin-block {
		display: none;
	}

	div.items-cart-value {
		width: 20px;
		height: 20px;
		position: absolute;
		top: -5px;
		right: -5px;
		background-color: black;
		color: red;
		border-radius: 50px;
		z-index: 10;
		font-size: 0.9rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	nav.top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		a {
			font-weight: 900;
		}
	}

	nav.bottom-row {
		display: block;
		position: static;
		height: auto;
		margin: auto -1rem;
		border-top: 2px solid var(--support-light);

		ul {
			display: flex;
			flex-direction: row;
			max-width: none;
			background-color: var(--page);
			justify-content: space-between;
			li {
				width: 100%;
			}
			a {
				padding: 7px 7px;
				color: var(--support);
				font-weight: 700;
				text-align: center;
				border-bottom: 2px solid var(--support-light);

				&:hover {
					border-bottom: 2px solid var(--color);
					color: var(--color);
				}
			}
		}

		.router-link-active {
			border-bottom: 2px solid var(--support);
		}
	}

	.menu-toggle,
	.location-btn {
		background-color: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		padding: 0;
		width: 40px;
		height: 50px;
	}
	.location-btn {
		width: 30px;
		height: 30px;
		position: relative;
	}

	.line {
		fill: none;
		stroke: var(--support-soft);
		stroke-width: 6;
		transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
			stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	.line1 {
		stroke-dasharray: 60 207;
		stroke-width: 6;
	}
	.line2 {
		stroke-dasharray: 60 60;
		stroke-width: 6;
	}
	.line3 {
		stroke-dasharray: 60 207;
		stroke-width: 6;
	}

	/// OPEN
	///
	header.toggle-open .line1 {
		stroke-dasharray: 90 207;
		stroke-dashoffset: -134;
		stroke-width: 6;
	}
	header.toggle-open .line2 {
		stroke-dasharray: 1 60;
		stroke-dashoffset: -30;
		stroke-width: 6;
	}
	header.toggle-open .line3 {
		stroke-dasharray: 90 207;
		stroke-dashoffset: -134;
		stroke-width: 6;
	}

	header.toggle-open {
		signin-block {
			display: grid;
			grid-template-columns: 100px 100px;
			text-align: center;
			justify-content: center;
			align-items: center;
			row-gap: 10px;
			padding: 7px;
			background-color: var(--page-support);
			a {
				max-width: fit-content;
				margin: 0 auto;
				padding: 5px 10px;
				text-transform: uppercase;
				border-radius: 50px;
				font-weight: 600;
			}
			a:first-of-type {
				grid-column: 1;
				background-color: var(--page);
				border: 1px solid var(--support);
			}
			a:last-of-type {
				grid-column: 2;
				color: var(--page);
				background-color: var(--color-mute);
				border: 1px solid var(--color-mute);
			}
			span {
				grid-column: span 2;
			}
		}

		nav.site-menu {
			position: fixed;

			height: 100vh;
			width: 100%;
			z-index: 10;
			top: 76px;
			ul {
				display: flex;
				height: 80%;
				flex-direction: column;
				max-width: none;
				background-color: var(--white);
				justify-content: flex-start;
				padding: 13px 0;

				li {
					width: 100%;
				}
				a {
					padding: 7px 50px;
					color: var(--support);
					font-weight: 700;
					text-align: left;
					border-bottom: none;
					font-size: clamp(0.94rem, calc(0.87rem + 0.34vw), 1.13rem);
					line-height: 1.4;

					&:hover {
						border-bottom: none;
						color: var(--color);
					}
				}
			}
		}
	}
</style>
