import { computed, reactive, ref, onMounted } from "vue";
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

	const currentUser = ref();

	const isLoggedIn = computed(function () {
		if (currentUser.value) {
			return true;
		} else {
			return false;
		}
	});

	onMounted(function () {
		if (localStorage.getItem("currentUser")) {
			currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
		} else {
			// nothin
		}
	});

	function add(record) {
		database.push(record);
	}

	function saveToStorage(user) {
		localStorage.setItem("currentUser", JSON.stringify(user, null, 2));
	}

	function signOut() {
		localStorage.removeItem("currentUser");
		currentUser.value = false;
	}

	const signInValue = ref(false);
	const signInAnimate = computed(() => {
		if (signInValue.value) {
			return "in-animation";
		} else {
			return "";
		}
	});
	function signInAnimation() {
		signInValue.value = true;
	}

	return {
		database,
		saveToStorage,
		isLoggedIn,
		currentUser,
		signOut,
		signInAnimate,
		signInAnimation,
	};
});
