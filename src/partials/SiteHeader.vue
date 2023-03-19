<script setup>
	import { RouterLink, useRoute } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';
	import burger from '@/assets/images/burger-icon.vue';
	import SvgIcon from '@/partials/SvgIcon.vue';
	import SignInBlock from '@/components/SignInBlock.vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
	const ui = useInterfaceStore();
	const route = useRoute();

	const itemAdded = computed(function () {
		if (user.cart.itemAdded) {
			return {
				text: 'Item added!',
				class: 'confirmation',
			};
		} else return '';
	});
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass} ${ui.toggleFixedHeader} site-header`">
		<inner-column>
			<nav class="top-row">
				<button class="menu-toggle" @click="ui.toggleMenu()" type="submit">
					<burger />
				</button>

				<RouterLink class="attention-voice logo" @click="ui.specificToggle()" to="/"
					><span class="main-color">DUNKIN</span><span class="off-color">’ </span></RouterLink
				>

				<transition name="fade" mode="out-in">
					<div v-if="!ui.cartMenuOpen" class="strict-voice cart-container" @click="ui.toggleCart()">
						<SvgIcon icon="basket" />
						<div class="items-cart-value" v-if="user.cart.products?.length">
							{{ user.cart.products?.length }}
						</div>
					</div>

					<div v-else class="strict-voice cart-container" @click="ui.toggleCart()">
						<SvgIcon icon="times" />
					</div>
				</transition>
			</nav>

			<nav class="site-menu bottom-row">
				<SignInBlock />
				<ul>
					<li class="desktop-view">
						<RouterLink @click="ui.specificToggle()" class="tiny-voice" to="/profile"
							>Profile</RouterLink
						>
					</li>
					<li>
						<RouterLink @click="ui.specificToggle()" class="tiny-voice" to="/menu">Menu</RouterLink>
					</li>

					<li class="logo">
						<RouterLink class="strict-voice logo" @click="ui.specificToggle()" to="/"
							><span class="main-color">Dunkin</span><span class="off-color">’</span></RouterLink
						>
					</li>

					<li>
						<RouterLink @click="ui.specificToggle()" class="tiny-voice" to="/search">Search</RouterLink>
					</li>
					<li>
						<RouterLink @click="ui.specificToggle()" class="tiny-voice" to="/rewards"
							>Rewards</RouterLink
						>
					</li>
					<li v-if="ui.mainMenuOpen">
						<a target="git" class="tiny-voice" href="https://github.com/JesseDevs/super-shot">GitHub</a>
					</li>
				</ul>
			</nav>

			<transition name="fade" mode="out-in">
				<div :class="`box-modal ${itemAdded.class}`">
					<p class="tiny-voice" v-if="user.cart.itemAdded">
						{{ itemAdded.text }}
					</p>
				</div>
			</transition>
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	header.site-header.fixed-header {
		position: fixed;
		width: 100%;

		@media (min-width: 600px) {
			position: static;
		}
	}

	div.box-modal {
		width: 150px;
		min-height: 50px;
		position: absolute;
		top: 75px;
		right: 13px;
		opacity: 0;

		padding: 15px;
		color: #000;
		background: var(--color);
		background: linear-gradient(180deg, rgba(var(--color-soft-rgb), 0.5) 0%, var(--color-soft) 60%);

		border-radius: 10px;

		display: grid;
		place-items: center;
		z-index: -200;

		&:after {
			content: '';
			position: absolute;
			top: -15px; /* value = - border-top-width - border-bottom-width */
			right: 7%; /* controls horizontal position */
			bottom: auto;
			left: auto;
			border-width: 0 15px 15px;
			border-style: solid;
			border-color: rgba(var(--color-soft-rgb), 0.6) transparent;
			/* reduce the damage in FF3.0 */
			display: block;
			width: 0;
		}

		p {
			font-weight: 600;
		}
	}

	div.confirmation {
		animation: fadeInOut 2s forwards;
		z-index: 200;
	}

	header.site-header {
		position: sticky;
		top: 0;
		z-index: 300;

		div.cart-container {
			margin-right: 5px;
			cursor: pointer;
		}
	}

	body.menu-open {
		display: block;
		overflow: hidden;
	}
	header inner-column {
		padding: 0.5rem 1rem;
		padding-bottom: 0px;
		display: flex;
		flex-direction: column;
		gap: 10px;

		.logo {
			color: var(--off-color);

			.main-color {
				font-weight: 900;
			}
		}
	}

	div.items-cart-value {
		width: 20px;
		height: 20px;
		position: absolute;
		top: -9px;
		right: -9px;
		background-color: var(--color-soft);
		border: 1.5px solid var(--color-mute);
		color: var(--color-text);
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
		height: 70px;
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
		border-top: 1px solid var(--support-light);

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
			li.desktop-view {
				display: none;
			}
			li {
				width: 100%;
			}
			a {
				padding: 7px 7px;
				color: var(--support);
				font-weight: 700;
				text-transform: uppercase;
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
		background-color: var(--page);
		z-index: 200;
		min-height: 90px;
		ad-block {
			display: none;
		}

		inner-column {
			width: 100%;
			position: fixed;
			height: 100%;
		}

		nav.site-menu {
			position: fixed;
			height: 100vh;
			width: 100%;
			z-index: 10;
			top: 90px;
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

	@media (min-width: 800px) {
		header inner-column {
			padding: 0 1rem;
			z-index: 100;
		}

		div.box-modal {
			top: 55px;
			right: 23px;
		}
		nav.top-row {
			display: none;
		}

		nav.bottom-row {
			border: none;

			.logo {
				display: block;
			}

			ul {
				gap: 15px;
				li.desktop-view {
					display: block;
				}

				li:not(.logo) {
					padding-top: 5px;
					&:after {
						content: '';
						position: absolute;
						bottom: 6px;
						left: 50%;
						transform: translateX(-50%);
						width: 0;
						height: 1px;
						background-color: var(--color);
						transition: width 0.3s ease-in-out; /* This will add a smooth transition effect to the border */
					}

					a {
						border-bottom: none;
					}

					&:hover::after {
						width: 50%;
					}
				}
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
	}
</style>
