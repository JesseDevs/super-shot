<script setup>
	import { RouterLink, useRoute } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	import { useCartStore } from "../stores/cart";
	import burger from "@/assets/images/burger-icon.vue";
	import SvgIcon from "@/partials/SvgIcon.vue";
	import SignInBlock from "@/components/SignInBlock.vue";

	const ui = useInterfaceStore();
	const route = useRoute();
	const cart = useCartStore();
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<nav class="top-row">
				<button class="menu-toggle" @click="ui.toggleMenu()" type="submit">
					<burger />
				</button>

				<RouterLink class="strict-voice logo" @click="ui.specificToggle()" to="/">LOGO.</RouterLink>

				<div class="strict-voice cart-container" @click="ui.toggleCart()">
					<SvgIcon icon="basket" />
					<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
						{{ cart.itemsInCart }}
					</div>
				</div>
			</nav>

			<nav class="site-menu bottom-row">
				<SignInBlock />
				<ul>
					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/">Home</RouterLink>
					</li>

					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/menu">Menu</RouterLink>
					</li>

					<li class="logo">
						<RouterLink class="strict-voice logo" @click="ui.specificToggle()" to="/">LOGO.</RouterLink>
					</li>

					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/search"
							>Search</RouterLink
						>
					</li>
					<li>
						<RouterLink @click="ui.specificToggle()" class="small-voice" to="/profile"
							>Profile</RouterLink
						>
					</li>
					<li v-if="ui.mainMenuOpen">
						<a target="git" href="https://github.com/JesseDevs/super-shot">GitHub</a>
					</li>
				</ul>
			</nav>
		</inner-column>
	</header>
</template>

<style lang="scss">
	header inner-column {
		padding: 0.5rem 1rem;
		padding-bottom: 0px;
		display: flex;
		flex-direction: column;
		gap: 10px;

		.logo {
			color: var(--off-color);
			text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
		}
	}

	signin-block {
		display: none;
		transition: all ease-in-out 1000ms;
	}

	div.items-cart-value {
		width: 20px;
		height: 20px;
		position: absolute;
		top: -9px;
		right: -9px;
		background-color: var(--color-soft);
		border: 1.5px solid var(--color-mute);
		color: var(--black-mute);
		border-radius: 50px;
		z-index: 10;
		font-size: 0.75rem;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	nav.top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		max-height: 40px;
		padding-top: 5px;

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

		.logo {
			display: none;
		}

		ul {
			display: flex;
			flex-direction: row;
			max-width: none;
			align-items: center;
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

	.menu-toggle {
		background-color: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		padding: 0;
		width: 40px;
		height: 35px;
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
		ad-block {
			display: none;
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

	@media (min-width: 900px) {
		header inner-column {
			padding: 0 1rem;
			z-index: 100;
		}
		nav.top-row {
			display: none;
		}

		nav.bottom-row {
			border: none;

			.logo {
				display: block;
			}

			ul li a {
				border-bottom: none;
				&:hover {
					border: none;
				}
			}

			.router-link-active {
				border: none;
				color: var(--off-color);
			}
		}
		signin-block {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 13px 1rem;
			gap: 8px;
			border-bottom: 2px solid var(--support-light);

			.header-action {
				cursor: pointer;
				outline: none;
				border: none;
				appearance: none;
				max-width: fit-content;

				font-size: var(--step--1);
				padding: 4px 15px;
				text-transform: uppercase;
				border-radius: 50px;
				font-weight: 600;
				line-height: 1.4;
			}

			button.header-action {
				background-color: var(--page);
				border: 1px solid var(--black);
			}

			a.header-action {
				background-color: var(--off-color);
				border: 1px solid var(--off-color);
				color: var(--page);
			}
			span {
				display: none;
			}
		}
	}
</style>
