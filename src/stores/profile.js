import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useProfilesStore = defineStore("Profiles", function () {
	const database = reactive([
		{
			username: "Jesse",
			password: "1234",
			name: "Jesse",
			role: "admin",
		},
	]);

	const currentUser = ref(JSON.parse(localStorage.getItem("currentUser")) || {});
	const isLoggedIn = computed(function () {
		if (currentUser.value) {
			return true;
		} else {
			return false;
		}
	});

	function add(record) {
		database.push(record);
	}

	function saveToStorage(user) {
		localStorage.setItem("currentUser", JSON.stringify(user, null, 2));
	}
	return {
		database,
		saveToStorage,
		isLoggedIn,
		currentUser,
	};
});
