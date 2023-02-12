<script setup>
	import { useRoute } from "vue-router";
	import { useFirestore, useDocument } from "vuefire";
	import { doc } from "@firebase/firestore";

	const route = useRoute();
	const db = useFirestore();
	const category = useDocument(doc(db, "categories", "coffee"));
</script>

<template>
	<detail-block>
		<div class="product-outlet">
			<h1>Detail</h1>
			<p v-if="category">{{ category }}</p>
			<!-- <RouterView /> -->
		</div>
	</detail-block>
</template>
