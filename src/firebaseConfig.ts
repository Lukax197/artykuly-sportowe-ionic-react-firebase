import { resolve } from 'dns'
import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import { toast } from './toast'

const config = {
    apiKey: "AIzaSyAf5oesikrqvE_Amjm74aUKIdlQOm5rKOg",
    authDomain: "meczyk-com.firebaseapp.com",
    databaseURL: "https://meczyk-com-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meczyk-com",
    storageBucket: "meczyk-com.appspot.com",
    messagingSenderId: "483011925201",
    appId: "1:483011925201:web:2809368c01bd0e0430e1f0"
}

firebase.initializeApp(config)

export async function loginUsr(username: string, password: string) {
    const _auth = auth.getAuth()
    const email = `${username}@meczyk.com`

    try {
        const res = await auth.signInWithEmailAndPassword(_auth, email, password)
        console.log(res)
        return res
    } 
    catch(error) {
        console.log(error)
        return false
    }
}

export async function registerUser(username: string, password: string) {
    const _auth = auth.getAuth()
    const email = `${username}@meczyk.com`

    try {
        const res = await auth.createUserWithEmailAndPassword(_auth, email, password)
        console.log(res)
        return true
    }
    catch (error) {
        toast("Błędne hasło!")
        console.log(error)
        return false
    }
}

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.getAuth().onAuthStateChanged(function(user) {
            if(user) {
                resolve(user)
                unsubscribe()
            }
            else {
                resolve(null)
            }
        })
    })
}

export function logoutUser() {
    return auth.getAuth().signOut()
}

export async function addPost(post: Object) {
    const _store = firestore.getFirestore()
    let collectionRef = firestore.collection(_store, "posty")
    await firestore.addDoc(collectionRef, post)


    //pobieranie i wyświetlanie wszystkich danych
    // const dokumenty = await firestore.getDocs(collectionRef)
    //console.log(dokumenty.docs[0].)

    // setTimeout(() => {
    //     for(var i=0; i<dokumenty.docs.length; i++) {
    //         console.log(dokumenty.docs[i].get("name"), dokumenty.docs[i].get("tresc"))
    //     }
    // }, 1000)

    // aktualizowanie danych po ID
    // firestore.setDoc(firestore.doc(_store, 'posty', 'EMLW2rB6Z11HaT9LYp2e'), {name: "TEST UPDATE", tresc: "przykladowa tresc"})

    // pobranie danych po ID
    // const snap = await firestore.getDoc(firestore.doc(_store, 'posty', 'EMLW2rB6Z11HaT9LYp2e'))

    // if (snap.exists()) {
    //     console.log(snap.data())
    // }
    // else {
    //     console.log("No such document")
    // }

    // usuwanie dokumentu
    //await firestore.deleteDoc(firestore.doc(_store, 'posty', 'c7SuQdRhYVXVVVuo2sG1'))
}

export async function editPost(id: string, editedPost: Object) {
    const _store = firestore.getFirestore()
    await firestore.setDoc(firestore.doc(_store, 'posty', id), editedPost)
}

export async function getAllPosts() {
    const _store = firestore.getFirestore()
    return await firestore.getDocs(firestore.collection(_store, "posty"))
}

export async function getPostByID(id: string) {
    const _store = firestore.getFirestore()
    return await (await firestore.getDoc(firestore.doc(_store, 'posty', id))).data()
}

export async function deletePost(id: string) {
    const _store = firestore.getFirestore()
    await firestore.deleteDoc(firestore.doc(_store, 'posty', id))
}