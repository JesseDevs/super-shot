<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
	import { useCartStore } from "../stores/cart";
	import SvgIcon from "../components/SvgIcon.vue";

	const cart = useCartStore();
</script>

<template>
	<section>
		<inner-column>
			<module-thing>
				<h2 class="chant-voice">Cart</h2>
				{{ cart.checkoutTotal }}

				<SvgIcon icon="bell" />
				<ul>
					<li v-for="item in cart.purchasingCart">{{ item.name }} - {{ item.price }}</li>
				</ul>
			</module-thing>
		</inner-column>
	</section>
</template>
