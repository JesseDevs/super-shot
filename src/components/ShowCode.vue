<script setup>
	defineProps(['code']);
</script>
<template>
	<pre><code>
		{{ code }}
	</code></pre>
</template>

<style scoped lang="scss">
	pre {
		border: 1px solid red;
	}
</style>
