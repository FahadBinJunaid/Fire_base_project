
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

let title = document.getElementById("title")
let description = document.getElementById("description")
let post = document.getElementById("post")
let output = document.getElementById("output")



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB81Oih2Cud5wFJ7zpslwaM-WMO09b4H_4",
  authDomain: "example-project-39b9b.firebaseapp.com",
  projectId: "example-project-39b9b",
  storageBucket: "example-project-39b9b.firebasestorage.app",
  messagingSenderId: "941663064609",
  appId: "1:941663064609:web:51b75b220f3473f59ec960",
  measurementId: "G-5RYCXW0RYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

console.log(db)


async function addData() {
  try {
    post.disabled  = true
    post.textContent = "posting..."
    const docRef = await addDoc(collection(db, "posts"), {
      title: title.value,
      description: description.value
    });
    alert("Post added successfully!")
    title.value = ""
    description.value = ""
  } catch {
    alert("Failed to add post!");
    console.log(error);
  } finally{
    post.disabled  = false
    post.textContent = "Post"
  }
}

async function getData() {
  try {
    output.innerHTML = "Loading Data..."
    const querySnapshot = await getDocs(collection(db, "posts"));

    output.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      output.innerHTML += `
        <div class="post-card">
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <p>${data.createdAt}</p>
        </div>
      `;
    });

  } catch (error) {
    alert("Failed to get posts!");
    console.log(error);
  }
}
post.addEventListener("click", addData)

getData()