import { defineStore } from 'pinia';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { computed, reactive } from 'vue';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import slugid from 'slugid';

import { useCollection, useCurrentUser, useDocument, useStorageFile } from 'vuefire';
import { useFileDialog } from '@vueuse/core';
import { collection, doc, addDoc, deleteDoc, setDoc, updateDoc, getDoc, getDocs } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRoute, useRouter } from 'vue-router';

export const useUserService = defineStore('user', function () {
	const router = useRouter();
	const route = useRoute();
	const storage = getStorage();
	const { files, open, reset } = useFileDialog();
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

	const userDocumentReference = computed(function () {
		if (authUser.value?.uid) {
			return doc(collection(db, 'users'), authUser.value.uid);
		} else {
			return console.log('Reference is not ready..');
		}
	});

	const { data: userDocument, promise: getUserDocument } = useDocument(userDocumentReference);

	const id = computed(() => authUser.value?.uid);
	const email = computed(() => userDocument.value?.email);
	const username = computed(() => userDocument.value?.username);
	const firstN = computed(() => userDocument.value?.firstN);
	const lastN = computed(() => userDocument.value?.lastN);
	const profilePic = computed(() => userDocument.value?.profilePic);
	const isAdmin = computed(() => userDocument.value?.roles?.admin);

	// const fullImagePath = computed(() => `images/${files.value?.item(0).name}`);
	// const imageFileName = computed(() => `${files.value?.item(0).name}`);

	// const imageReference = computed(function () {
	// 	if (!profilePic.value) {
	// 		return storageRef(storage, fullImagePath.value);
	// 	} else {
	// 		return storageRef(storage, 'images/' + profilePic.value);
	// 	}
	// });

	// const { upload, url, refresh } = useStorageFile(imageReference);

	// async function addThumbnailUrlToUser() {
	// 	getUserDocument;
	// 	await updateDoc(doc(db, 'users', id.value), {
	// 		profilePic: imageFileName.value,
	// 	});
	// 	console.log(`>>> ${imageFileName.value} added to ${username.value}`);
	// }

	// async function uploadThumbnail() {
	// 	const imageFile = files.value?.item(0);
	// 	if (imageFile) {
	// 		await upload(imageFile);
	// 		await addThumbnailUrlToUser();
	// 	} else {
	// 		alert('No image bud');
	// 	}
	// }
	// Favorites

	async function toggleFavorite(itemId) {
		const docRef = doc(db, 'users', id.value, 'favorites', itemId);
		const favDoc = await getDoc(docRef);

		if (favDoc.exists()) {
			await deleteDoc(docRef);
			console.log('removed: ', itemId);
		} else {
			await setDoc(docRef, { itemId });
			console.log('added', itemId);
		}
	}

	const favoritesDocumentReference = computed(function () {
		if (id.value) {
			return collection(db, 'users', id.value, 'favorites');
		} else {
			return null;
		}
	});

	const favorites = useCollection(favoritesDocumentReference);

	// CART
	function getCartDocument() {
		const cartDocumentReference = computed(function () {
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

		const cartDocument = useDocument(cartDocumentReference);
		const total = computed(() => {
			return cartDocument.value?.length;
		});

		const itemAdded = ref(false);

		async function addToCart(item) {
			const itemId = slugid.nice();
			const itemWithId = { itemId, ...item };
			const variable = itemWithId.slug + '-' + itemWithId.itemId;
			if (itemWithId.model == 'base') {
				await setDoc(doc(db, 'users', id.value, 'cart', variable), itemWithId);
			}

			itemAdded.value = true;
			setTimeout(function () {
				itemAdded.value = false;
			}, 2000);
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

		async function clearGroup(item) {
			const querySnapshot = await getDocs(collection(db, 'users', id.value, 'cart'));
			querySnapshot.forEach((doc) => {
				if (doc.id.startsWith(item.slug)) {
					deleteDoc(doc.ref);
				}
			});
		}

		async function groupPlus(item) {
			const newId = slugid.nice();
			const variable = item.slug + '-' + newId;
			await setDoc(doc(db, 'users', id.value, 'cart', variable), item);
		}

		async function groupMinus(item) {
			const querySnapshot = await getDocs(collection(db, 'users', id.value, 'cart'));
			querySnapshot.forEach((doc) => {
				if (doc.id === item.slug + '-' + item.itemId) {
					deleteDoc(doc.ref);
				}
			});
		}

		return {
			products: cartDocument,
			total,
			addToCart,
			itemAdded,
			groups,
			clearCart,
			groupPlus,
			groupMinus,
			clearGroup,
		};
	}

	const cart = getCartDocument();

	//edit profile picture

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
		files,
		open,
		toggleFavorite,
		favorites,
		// url,
		// uploadThumbnail,
	};
});
