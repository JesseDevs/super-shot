import { computed, onMounted, watch, ref } from "vue";
import { defineStore } from "pinia";
import lodash from "lodash";

export const useCartStore = defineStore("cart", function () {
	const itemsInCart = computed(function () {
		let total = 0;
		purchasingCart.value.forEach(function (item) {
			total += item.quantity;
		});
		return total;
	});

	const purchasingCart = ref(JSON.parse(localStorage.getItem("shoppingCart")) || []);

	function addItem(record) {
		const existingItem = purchasingCart.value.find((item) => item.id === record.id);
		if (existingItem) {
			existingItem.quantity++;
		} else {
			purchasingCart.value.push({ ...record, quantity: 1 });
		}
		localStorage.setItem("shoppingCart", JSON.stringify(purchasingCart.value));
	}

	const checkoutTotal = computed(function () {
		var sum = 0;
		purchasingCart.value.forEach((item) => {
			sum += item.price * item.quantity;
		});
		return lodash.round(sum, 2);
	});

	function clear() {
		purchasingCart.value = [];
		localStorage.setItem("shoppingCart", []);
	}

	watch(purchasingCart, function (newState, oldState) {
		if (newState !== oldState) {
			localStorage.setItem("shoppingCart", JSON.stringify(purchasingCart.value));
		}
	});

	return {
		addItem,
		checkoutTotal,
		purchasingCart,
		itemsInCart,
		clear,
	};
});
