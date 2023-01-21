import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", function () {
	const itemsInCart = computed(function () {
		return purchasingCart.length;
	});

	const checkoutTotal = computed(function () {
		var sum = 0;
		purchasingCart.forEach((item) => {
			sum += item.price;
		});
		return sum;
	});

	const purchasingCart = reactive([
		{
			id: "fanlf2fn2f82n",
			name: "Iced Coffee",
			slug: "iced-coffee",
			desc: "Freshly brewed and full of flavor, our Iced Coffee gets you energized and ready to go.",
			category: "coffee",
			tags: ["iced", "cold"],
			price: 3.99,
			size: "M",
		},
	]);

	function addItem(record) {
		purchasingCart.push(record);
		console.log(purchasingCart);
	}

	return {
		addItem,
		checkoutTotal,
		purchasingCart,
		itemsInCart,
	};
});
