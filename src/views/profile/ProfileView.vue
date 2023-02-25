<script setup>
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
</script>

<template>
	<project-page>
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

		<main class="outlet">
			<RouterView />
		</main>
	</project-page>
</template>

<style lang="scss">
	project-page {
		display: flex;
		flex-direction: column;
		gap: 20px;

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

				&:hover {
					background-color: var(--color-soft);
					color: var(--black);
				}
			}
		}
	}
</style>
