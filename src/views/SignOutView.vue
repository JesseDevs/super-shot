<script setup>
	import { useUserService } from '@/services/UserService';
	const user = useUserService();

	user.signOut();
</script>

<template>
	<h1 class="yell-voice">Sorry to see you go...</h1>
</template>

<style lang="scss"></style>
