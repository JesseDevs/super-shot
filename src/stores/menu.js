import { reactive } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", function () {
	const categories = reactive([
		{
			title: "Coffee",
			slug: "coffee",
			products: [
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
			],
		},
		{
			title: "Donuts",
			slug: "donuts",
			products: [
				{
					id: "falfh2382fb",
					name: "Donut Hole",
					slug: "donut-hole",
					desc: "They’re made in a variety of delicious flavors and free of artificial dyes, so it’s easy to try them all.",
					category: "donuts",
					tags: ["snack", "bite", "treat"],
					price: 1.49,
				},
			],
		},
		{
			title: "Sandwiches",
			slug: "sandwiches",
			products: [
				{
					id: "aflnswf82f29fh",
					name: "Bacon, Egg & Cheese",
					slug: "bacon-egg-cheese",
					desc: "A breakfast classic featuring cherrywood smoked bacon, egg and American cheese.",
					category: "sandwich",
					tags: ["meal", "bacon", "cheese", "bagel"],
					price: 4.99,
				},
			],
		},
	]);
	//JSON. parse (localStorage. getItem(menu)) || []
	// LocalStorage. setItem("menu", JSON.stringify(menu, null,2));

	function getCategory(x) {
		return categories.find(function (c) {
			return c.slug == x;
		});
	}

	function add(record) {
		var rec = record.category;
		var cate = getCategory(rec);
		cate.products.push(record);
	}

	return {
		add,
		categories,
	};
});
