import { reactive } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", function () {
	const categories = reactive([
		{
			title: "Coffee",
			slug: "coffee",
			info: "Freshly crafted beverages served in a variety of delicious flavors. Ask to try your favorite beverages hot or served over ice.",
			imageURL: "https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign-v2/302x570/iced_coffee.png",
			products: [
				{
					id: "fanlf2fn2f82n",
					name: "Iced Coffee",
					slug: "iced-coffee",
					desc: "Freshly brewed and full of flavor, our Iced Coffee gets you energized and ready to go.",
					category: "coffee",
					imageURL:
						"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign-v2/302x570/iced_coffee.png",
					price: 3.99,
					size: "M",
				},
			],
		},
		{
			title: "Donuts",
			slug: "donuts",
			info: "Every shape, any size and irresistibly delicious—each bite will brighten your day.",
			imageURL:
				"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/donuts/DNK00840_5Munchkins_lib_RGB@2x.png",
			products: [
				{
					id: "falfh2382fb",
					name: "Donut Hole",
					slug: "donut-hole",
					desc: "They’re made in a variety of delicious flavors and free of artificial dyes, so it’s easy to try them all.",
					category: "donuts",
					imageURL:
						"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/donuts/DNK00840_5Munchkins_lib_RGB@2x.png",
					price: 1.49,
				},
			],
		},
		{
			title: "Sandwiches",
			slug: "sandwiches",
			info: "Freshly made with delicious ingredients, these items are stacked with flavor.",
			imageURL:
				"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/sandwiches-and-more/DNK00686_BaconEggCheeseBagel_200px@2x.png",
			products: [
				{
					id: "aflnswf82f29fh",
					name: "Bacon, Egg & Cheese",
					slug: "bacon-egg-cheese",
					desc: "A breakfast classic featuring cherrywood smoked bacon, egg and American cheese.",
					category: "sandwiches",
					imageURL:
						"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/sandwiches-and-more/DNK00686_BaconEggCheeseBagel_200px@2x.png",
					price: 4.99,
				},
			],
		},
		{
			title: "Frozen Drinks",
			slug: "frozen-drinks",
			info: "Freshly blended creations that turn your favorite flavors into refreshingly frozen treats.",
			imageURL:
				"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/frozen-drinks/DNK00533_FrozenCoffee_200px@2x.png",
			products: [
				{
					id: "asg34i34ff",
					name: "Frozen Coffee",
					slug: "frozen-coffe",
					desc: "Our energizing Frozen Coffee is smooth, creamy and full of real Dunkin’® flavor—making it the perfect way to cool off.",
					category: "frozen-drinks",
					imageURL:
						"https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/frozen-drinks/DNK00533_FrozenCoffee_200px@2x.png",
					price: 3.99,
					size: "M",
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
