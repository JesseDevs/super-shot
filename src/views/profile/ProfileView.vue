<script setup>
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
</script>

<template>
	<profile-page>
		<profile-nav>
			<p class="loud-voice">Hello! {{ user.username }}</p>
			<nav>
				<ul>
					<li>
						<RouterLink to="/profile"> Account </RouterLink>
					</li>
					<li>
						<RouterLink to="/profile/billing"> Billing </RouterLink>
					</li>
					<li>
						<RouterLink to="/profile/favorites"> Favorites </RouterLink>
					</li>
				</ul>
			</nav>
		</profile-nav>

		<main class="outlet">
			<RouterView />
		</main>
	</profile-page>
</template>

<style lang="scss">
	profile-page {
		display: flex;
		flex-direction: column;
		gap: 30px;

		nav ul {
			display: flex;
			justify-content: space-evenly;
			background-color: var(--off-color-mute);
			border: 2px solid var(--off-color-mute);

			li {
				width: 100%;
				border-right: 2px solid var(--off-color-mute);
			}
			li:last-of-type {
				border: none;
			}
			a {
				padding: 8px;
				color: var(--page);
				transition: all 0.2s ease-in-out;
				font-weight: 600;
				text-align: center;

				&:hover {
					background-color: var(--off-color-soft);
					color: var(--color-text);
				}

				// &:last-of-type {
				// 	border: none;
				// }
			}
		}

		profile-nav {
			display: flex;
			width: 100%;
			flex-direction: column;
			gap: 20px;
			background-color: var(--page);
			// position: sticky;
			// top: var(--header-space);
			// z-index: 299;
			// padding-top: 30px;
			nav {
				max-width: 600px;
			}

			.router-link-exact-active {
				background-color: var(--off-color);
				color: var(--page);
			}
		}
	}
</style>
