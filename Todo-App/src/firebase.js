import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfUEr86-4ZehpnbZQLlI-zS9D1ihFcQsk",
  authDomain: "jays-todo-674f4.firebaseapp.com",
  projectId: "jays-todo-674f4",
  storageBucket: "jays-todo-674f4.appspot.com",
  messagingSenderId: "29234579456",
  appId: "1:29234579456:web:975d7147ea2d88670ef0e5",
  measurementId: "G-JQBQY4VL9D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "list");
// const analytics = getAnalytics(app);
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs)
    let list = []
    snapshot.docs.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })
    console.log(list)
  })

export const auth = getAuth(app);
export { db };