import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCollection, useCurrentUser, useDocument } from 'vuefire';
import { firebaseApp } from '@/firebase';
import { collection, addDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRoute, useRouter } from 'vue-router';

export const useUserService = defineStore('user', function () {
	const router = useRouter();
	const route = useRoute();
	const firebaseAuth = getAuth();
	const authUser = useCurrentUser();
	const db = useFirestore();
	const userDoc = ref(null);

	const form = reactive({
		email: '',
		password: '',
		username: '',
	});

	function getUserDocument() {
		const userDocumnetReference = computed(function () {
			if (authUser.value?.uid) {
				return doc(collection(db, 'users'), authUser.value.uid);
			} else {
				return console.log('Reference is not ready..');
			}
		});

		const userDocument = useDocument(userDocumnetReference);
		const username = computed(function () {
			return userDocument.value?.username;
		});
		// const isAdmin = computed(() => userDocument.value?.roles.admin);
		return { username };
	}

	const { username } = getUserDocument();

	// 	const xReference = computed( function() {
	// 	if (authorizedUser.value?.uid) {
	// 		return doc(collection... etc etc... get what you need (reference to doc/collection)
	// 	} else {
	// 		// : (
	// 	}
	// });

	// const xDocument = useDocument(xReference);
	// // or
	// const xCollection = useCollection(xReference);

	function addUsernameData(id, u) {
		setDoc(doc(db, 'usernames', id), {
			username: u,
		});
	}

	function alsoCreateUserDoc(userId, u, e) {
		// Create a new user document in Firestore
		setDoc(doc(db, 'users', userId), {
			username: u,
			email: e,
			roles: { guest: true },
		});
	}

	async function changeUsername(newUsername) {
		const updated = await updateDoc(doc(db, 'users', authUser.value.uid), {
			username: newUsername,
		});
		console.log('updated');

		if (updated) {
			return true;
		} else {
			console.log("Update didn't work");
		}
	}

	//CART STUFF
	async function addToCart(item) {
		addDoc(collection(db, 'users', authUser.value?.uid, 'cart'), item);
	}

	// SIGN UP
	function signUp(email, password) {
		createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
			.then(async (userCredential) => {
				console.log('user.signUp', userCredential);
				alsoCreateUserDoc(userCredential.user.uid, form.username, form.email);
				addUsernameData(userCredential.user.uid, form.username);
				initiateCart(userCredential.user.uid);
				clearForm(form);
				router.push({ path: '/profile' });
			})
			.catch((error) => {
				console.log('code', error.code);
				console.log('message', error.message);
			});
	}

	// SIGN IN
	function signIn(form) {
		const { email, password } = form;
		signInWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => {
				console.log('user.signIn');
				clearForm(form);
				router.push(route.query.redirect || '/');
			})
			.catch((error) => {
				console.log('error:', error);
			});
	}

	// SIGN OUT
	function signOut() {
		fbSignOut(firebaseAuth)
			.then(() => {
				console.log('user.signOut');
				router.push({ path: '/' });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function clearForm() {
		form.email = '';
		form.password = '';
		form.username = '';
	}

	return {
		signUp,
		signIn,
		signOut,
		authUser,
		form,
		userDoc,
		changeUsername,
		username,
		addToCart,
	};
});
