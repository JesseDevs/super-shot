import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", function () {
	const database = reactive([
		{
			username: "Jesse",
			password: "Password",
			role: "admin",
		},
	]);

	const isLoggedIn = ref(false);
	const currentUser = ref({});

	function add(record) {
		database.push(record);
	}

	return {
		database,
		isLoggedIn,
		currentUser,
	};
});
