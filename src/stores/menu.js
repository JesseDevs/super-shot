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
					slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
					desc: "A breakfast classic featuring cherrywood smoked bacon, egg and American cheese.",
					category: "sandwich",
					tags: ["meal", "bacon", "cheese", "bagel"],
				},
			],
		},
	]);

	function add(record) {
		var cate = record.category;
		const x = categories.find(function (c) {
			return c.slug == cate;
		});

		x.products.push(record);
		console.log(x.products);
	}

	return {
		add,
		categories,
	};
});
