import { reactive, computed, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import lodash from "lodash";

export const useCartStore = defineStore("cart", function () {
	const itemsInCart = computed(function () {
		return purchasingCart.length;
	});

	const checkoutTotal = computed(function () {
		var sum = 0;
		purchasingCart.forEach((item) => {
			sum += item.price;
		});
		return lodash.round(sum, 2);
	});

	const purchasingCart = reactive([]);

	function addItem(record) {
		purchasingCart.push(record);
	}

	onMounted(function () {
		if (localStorage.getItem("myData")) {
			purchasingCart.items = JSON.parse(localStorage.getItem("myData"));
		} else {
			// nothin
		}
	});

	watch(purchasingCart, function (newState, oldState) {
		if (newState !== oldState) {
			localStorage.setItem("myData", JSON.stringify(newState.items));
		}
	});

	return {
		addItem,
		checkoutTotal,
		purchasingCart,
		itemsInCart,
	};
});
