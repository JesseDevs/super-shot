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

	const form = reactive({
		email: '',
		password: '',
		username: '',
		firstN: '',
		lastN: '',
		// profilePic: '',
	});

	const userDocumnetReference = computed(function () {
		if (authUser.value?.uid) {
			console.log('Success');
			return doc(collection(db, 'users'), authUser.value.uid);
		} else {
			return console.log('Reference is not ready..');
		}
	});

	const { data: userDocument, promise: getUserDocument } = useDocument(userDocumnetReference);

	const username = computed(() => {
		return userDocument.value?.username;
	});
	const firstN = computed(() => {
		return userDocument.value?.firstN;
	});
	const lastN = computed(() => {
		return userDocument.value?.lastN;
	});

	// const profilePic = computed(function () {
	// 	return userDocument.value?.profilePic;
	// });

	const email = computed(function () {
		return userDocument.value?.email;
	});

	function getCartDocument() {
		const cartDocumnetReference = computed(function () {
			if (authUser.value?.uid) {
				const userRef = doc(collection(db, 'users'), authUser.value.uid);
				const cartRef = collection(userRef, 'cart');
				console.log('Success');
				return cartRef;
			} else {
				console.log('Reference is not ready..');
				return null;
			}
		});

		const cartDocument = useDocument(cartDocumnetReference);
		const total = computed(() => {
			return cartDocument.value?.length;
		});

		const itemAdded = ref(false);

		async function addToCart(item) {
			addDoc(collection(db, 'users', authUser.value?.uid, 'cart'), item);

			itemAdded.value = true;

			setTimeout(() => {
				itemAdded.value = false;
			}, 1000);
		}

		const groups = computed(function () {
			return cartDocument.value?.reduce(function (group, item) {
				group[item.slug] = group[item.slug] || [];
				group[item.slug].push(item);
				return group;
			}, {});
		});

		return { products: cartDocument, total, addToCart, itemAdded, groups };
	}

	const cart = getCartDocument();

	function alsoCreateUserDoc(userId, u, e) {
		// Create a new user document in Firestore
		setDoc(doc(db, 'users', userId), {
			username: u,
			email: e,
			firstN: '',
			lastN: '',
			profilePic: '',
			roles: { guest: true },
		});
	}

	async function updateProfile(form) {
		console.log('working');
		const updated = await updateDoc(doc(db, 'users', authUser.value.uid), {
			username: form.username,
			firstN: form.firstN,
			lastN: form.lastN,
		});
		console.log('updated');

		return true;
	}

	// SIGN UP
	function signUp(email, password) {
		createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
			.then(async (userCredential) => {
				console.log('user.signUp', userCredential);
				alsoCreateUserDoc(userCredential.user.uid, form.username, form.email);
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
		updateProfile,
		cart,
		getUserDocument,
		username,
		firstN,
		lastN,
		email,
		// profilePic,
	};
});
