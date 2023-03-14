<script setup>
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
</script>

<template>
	<profile-page>
		<profile-nav>
			<h1 class="loud-voice">Welcome, {{ user.username }}</h1>
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
			gap: 1px;

			li {
				width: 100%;
			}
			a {
				padding: 10px;
				border: 2px solid var(--color);
				background-color: var(--color-mute);
				color: var(--page);
				transition: all 0.2s ease-in-out;
				font-weight: 600;

				&:hover {
					background-color: var(--color-soft);
					color: var(--black);
				}
			}
		}

		profile-nav {
			display: flex;
			width: 100%;
			flex-direction: column;
			gap: 20px;
			background-color: var(--page);
			position: sticky;
			top: 126px;
			z-index: 300;
		}
	}
</style>
