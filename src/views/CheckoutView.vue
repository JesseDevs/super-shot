<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
	import { useCartStore } from "../stores/Cart";
	import SvgIcon from "../components/SvgIcon.vue";

	const cart = useCartStore();
</script>

<template>
	<section>
		<inner-column>
			<cart-thing>
				<h2 class="chant-voice">Cart</h2>
				{{ cart.checkoutTotal }}

				<ul>
					<li v-for="item in cart.purchasingCart">{{ item.name }} - {{ item.price }}</li>
				</ul>
			</cart-thing>
		</inner-column>
	</section>
</template>
