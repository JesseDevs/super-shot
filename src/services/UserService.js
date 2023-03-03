import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCurrentUser, useDocument } from 'vuefire';
import { collection, doc, addDoc, deleteDoc, setDoc, query, where, limit } from 'firebase/firestore';
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
		profilePic: '',
	});

	const userDocumnetReference = computed(function () {
		if (authUser.value?.uid) {
			return doc(collection(db, 'users'), authUser.value.uid);
		} else {
			return console.log('Reference is not ready..');
		}
	});

	const { data: userDocument, promise: getUserDocument } = useDocument(userDocumnetReference);

	const id = computed(() => authUser.value?.uid);
	const email = computed(() => userDocument.value?.email);
	const username = computed(() => userDocument.value?.username);
	const firstN = computed(() => userDocument.value?.firstN);
	const lastN = computed(() => userDocument.value?.lastN);
	const isAdmin = computed(() => userDocument.value?.roles?.admin);
	const profilePic = computed(() => userDocument.value?.profilePic);

	function getCartDocument() {
		const cartDocumnetReference = computed(function () {
			if (id.value) {
				const userRef = doc(collection(db, 'users'), id.value);
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
			addDoc(collection(db, 'users', id.value, 'cart'), item);

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

		async function clearCart() {
			const userRef = doc(collection(db, 'users'), id.value);
			const cartRef = collection(userRef, 'cart');

			const cartQuerySnapshot = await getDocs(cartRef);
			const cartDocs = cartQuerySnapshot.docs;

			cartDocs.forEach(async (doc) => {
				await deleteDoc(doc.ref);
			});
		}

		async function groupPlus(item) {
			await addDoc(collection(db, 'users', id.value, 'cart'), item);
		}

		async function groupMinus(item) {}

		return {
			products: cartDocument,
			total,
			addToCart,
			itemAdded,
			groups,
			clearCart,
			groupPlus,
			groupMinus,
		};
	}

	const cart = getCartDocument();

	function alsoCreateUserDoc(userId, u, e) {
		// Create a new user document in Firestore
		setDoc(doc(db, 'users', userId), {
			username: u,
			email: e,
			firstN: '',
			lastN: '',
			profilePic: '@/assets/profile/profile.webp',
			roles: { guest: true },
		});
	}

	async function updateProfile(form) {
		console.log('working');
		await updateDoc(doc(db, 'users', id.value), {
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
		profilePic,
		isAdmin,
	};
});
