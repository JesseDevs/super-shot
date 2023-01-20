import { reactive } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", function () {
	const database = reactive([
		{
			username: "Jesse",
			slug: "Password",
		},
	]);

	function add(record) {
		database.push(record);
	}

	return {
		database,
	};
});
