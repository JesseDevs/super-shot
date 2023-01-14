<script setup>
	import AreaOfRoom from "../components/AreaOfRoom.vue";
</script>

<template>
	<div class="test">
		<h1>This is an test page</h1>
	</div>
	<h1 v-if="$route.params.name">Exercise: {{ $route.params.name }}</h1>
	<AreaOfRoom />
</template>
