import { reactive } from "vue";
import { defineStore } from "pinia";

export const useMonsterStore = defineStore("monsters", function () {
	const list = reactive([
		{
			id: "nofnf832nffo3",
			name: "Echo",
			slug: "echo",
			age: 1,
		},
		{
			id: "nofnf832nffo3",
			name: "Jesse",
			slug: "jesse",
			age: 20,
		},
		{
			id: "nofnf832nffo3",
			name: "Derek",
			slug: "derek",
			age: 21,
		},
	]);
	function add(monster) {
		list.push(monster);
	}

	return {
		list,
		add,
	};
});
