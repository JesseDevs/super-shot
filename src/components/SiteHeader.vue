<script setup>
	import { RouterLink, useRoute } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	const ui = useInterfaceStore();
	const route = useRoute();
</script>

<template>
	<header :class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<nav class="top-row">
				<button class="menu-toggle" @click="ui.toggleMenu()" type="submit" aria-label="Main Menu">
					<svg width="100" height="100" viewBox="0 0 100 100">
						<path
							class="line line1"
							d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
						/>
						<path class="line line2" d="M 20,50 H 80" />
						<path
							class="line line3"
							d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
						/>
					</svg>
				</button>

				<RouterLink class="strict-voice" @click="ui.specificToggle()" to="/">LOGO.</RouterLink>

				<RouterLink class="location-btn" to="/sign-in">
					<img src="@/assets/images/location-icon.svg" alt="location icon" />
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
