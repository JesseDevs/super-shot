<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
	import CheckoutBtn from "../components/CheckoutBtn.vue";
</script>

<template>
	<section>
		<inner-column>
			<home-module>
				<h1>HOME</h1>
				<RouterLink class="button" to="/sign-in">Sign In</RouterLink>
				<CheckoutBtn />
			</home-module>
		</inner-column>
	</section>
</template>

<style lang="scss">
	home-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		h1 {
			max-width: 23ch;
			font-weight: 700;
		}
	}
</style>
