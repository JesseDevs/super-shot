<script setup></script>

<template>
	<h1>profile</h1>

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

	<main class="outlet">
		<RouterView />
	</main>
</template>

<style lang="scss"></style>
